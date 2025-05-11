const razorpay = require("../config/razorpay");
const Product = require("../models/product.model"); // Assuming you have a Product model
const Payment = require("../models/payment.model"); // Import the Payment model
const OrderItem = require("../models/orderItem.model"); // Import the OrderItem model
const crypto = require("crypto");
const { sendOrderConfirmationEmail } = require("../services/emailServices"); // Import the email service

exports.createOrder = async (req, res) => {
  const { productIds, quantities } = req.body;

  try {
    // Fetch the products by their IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Calculate the total amount using the quantities
    const totalAmount = products.reduce((total, product, index) => {
      return total + product.price * quantities[index];
    }, 0);

    const options = {
      amount: totalAmount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    productIds,
    userName,
    user_id,
    amount,
    cartItems,
    address, // New fields added
    phone_number, // New fields added
    userEmail, // New field added for user's email
  } = req.body;

  const razorpayKeySecret = "C8HOS1oqNPl9gms8WxKXnGVK"; // Replace with your actual Razorpay key secret

  const hmac = crypto.createHmac("sha256", razorpayKeySecret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      const products = await Product.find({ _id: { $in: productIds } });

      const productDetails = cartItems.map((item) => {
        const product = products.find((p) => p._id.toString() === item._id);
        return {
          productId: item._id,
          productName: product.product_name,
          productPrice: product.price,
          quantity: item.quantity,
        };
      });

      const payment = new Payment({
        user_id,
        userName,
        address, // Store address
        phone_number, // Store phone number
        products: productDetails,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "success",
        delivery_status: "pending",
      });

      await payment.save();

      // Save details of every product in OrderItem
      for (const item of cartItems) {
        const product = products.find((p) => p._id.toString() === item._id);
        const orderItem = new OrderItem({
          order_id: payment._id,
          product_id: item._id,
          product_name: product.product_name,
          product_price: product.price,
          quantity: item.quantity,
        });
        await orderItem.save();
      }

      // Send order confirmation email
      await sendOrderConfirmationEmail(userEmail, req.body);

      res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error saving payment details" });
    }
  } else {
    // Payment failed
    try {
      const products = await Product.find({ _id: { $in: productIds } });

      const productDetails = cartItems.map((item) => {
        const product = products.find((p) => p._id.toString() === item._id);
        return {
          productId: item._id,
          productName: product.product_name,
          productPrice: product.price,
          quantity: item.quantity,
        };
      });

      const payment = new Payment({
        user_id,
        userName,
        address, // Store address
        phone_number, // Store phone number
        products: productDetails,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "failure",
      });

      await payment.save();

      // Save details of every product in OrderItem
      for (const item of cartItems) {
        const product = products.find((p) => p._id.toString() === item._id);
        const orderItem = new OrderItem({
          order_id: payment._id,
          product_id: item._id,
          product_name: product.product_name,
          product_price: product.price,
          quantity: item.quantity,
        });
        await orderItem.save();
      }

      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error saving payment details" });
    }
  }
};
