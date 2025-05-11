import React, { useContext, useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { BsBagX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
import { makePaymentRequest } from "../../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Cart.scss";
import { useNavigate } from "react-router-dom";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Cart = () => {
  const { cartItems, setShowCart, cartSubTotal, userName, setCartItems } =
    useContext(Context);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-info"));
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  const validateForm = () => {
    let formErrors = {};

    if (!address.trim()) {
      formErrors.address = "Address is required";
    }
    if (!phoneNumber.trim()) {
      formErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      formErrors.phoneNumber = "Invalid phone number format";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handlePayment = async () => {
    if (userInfo == null) {
      console.log("User not logged in");
      navigate("/login");
      return;
    }
    if (!validateForm()) {
      return;
    }

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const productIds = cartItems.map((item) => item._id);
      const quantities = cartItems.map((item) => item.quantity);
      const response = await makePaymentRequest.post(
        "/api/payments/create-order",
        { productIds, quantities }
      );

      const totalAmount = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      const options = {
        key: "rzp_test_JcAqSFto3yK5sf",
        currency: response.data.currency,
        amount: response.data.amount * 100,
        order_id: response.data.id,
        name: "DJC",
        description: "Test Transaction",
        image: "https://your-company-logo.png",
        handler: async function (response) {
          try {
            const verifyResponse = await makePaymentRequest.post(
              "/api/payments/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                productIds,
                user_id: userInfo.user_id,
                userName: userInfo.name,
                amount: totalAmount,
                cartItems,
                address: address,
                phone_number: phoneNumber,
                userEmail: userInfo.email, // Include user's email
              }
            );

            if (verifyResponse.data.success) {
              setPaymentStatus("success");
              setCartItems([]);
              toast.success(
                "Payment Successful! Thank you for your purchase.",
                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            } else {
              setPaymentStatus("failure");
              toast.error("Payment Failed! Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } catch (err) {
            console.log(err);
            setPaymentStatus("failure");
            toast.error("Payment Failed! Please try again.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } finally {
            // Ensure toast is shown regardless of the outcome
            toast.clearWaitingQueue();
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      setPaymentStatus("failure");
      toast.error("Payment Failed! Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="cart-panel">
      <ToastContainer />
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsBagX />
            <span>No products in the cart.</span>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="user-info">
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={errors.address ? "error" : ""}
                />
                {errors.address && (
                  <span className="error-message">{errors.address}</span>
                )}
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={errors.phoneNumber ? "error" : ""}
                />
                {errors.phoneNumber && (
                  <span className="error-message">{errors.phoneNumber}</span>
                )}
              </div>
              <div className="subtotal">
                <span className="text">Subtotal :</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
