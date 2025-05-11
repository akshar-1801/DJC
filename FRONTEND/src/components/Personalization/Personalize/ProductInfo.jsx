import React, { useState, useEffect } from "react";
import styles from "./ProductInfo.module.css";
import OrderFormPopup from "./OrderFormPopup"; // New component
import { useNavigate } from "react-router-dom";

const ProductInfo = ({ selectedGem, selectedSetting }) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-info"));
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  const handleBuyNow = () => {
    if (userInfo == null) {
      navigate("/login");
      return;
    }
    window.scrollTo({ top: 100, behavior: "smooth" });
    if (selectedGem && selectedSetting) {
      setShowOrderForm(true); // Show the order form
    }
  };

  const handleClosePopup = () => {
    setShowOrderForm(false);
  };

  const calculateTotal = () => {
    if (selectedGem && selectedSetting) {
      return selectedGem.price + selectedSetting.price;
    }
    return null;
  };

  const sizeList = selectedSetting?.size_list || [];

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.title}>
        {selectedGem == null ? "Select a Gemstone" : selectedGem.product_name} +
        {selectedSetting == null
          ? " Select a Setting"
          : " " + selectedSetting.product_name}
      </h1>
      <p className={styles.type}>Personalized Product</p>
      <div className={styles.pricing}>
        <span className={styles.price}>
          {!selectedGem || !selectedSetting
            ? "No price available"
            : "₹" +
              selectedGem.price.toLocaleString() +
              " + " +
              "₹" +
              selectedSetting.price.toLocaleString()}
        </span>
        {selectedGem && selectedSetting && (
          <span className={styles.price}>
            <p className={styles.type}>Total Amount</p>
            {"₹" + calculateTotal().toLocaleString()}
          </span>
        )}
      </div>
      <p className={styles.taxes}>(Inclusive of all taxes)</p>
      <div className={styles.actions}>
        <button className={styles.button50} onClick={handleBuyNow}>
          Contact Us
        </button>
      </div>
      {showOrderForm && (
        <OrderFormPopup
          selectedGem={selectedGem}
          selectedSetting={selectedSetting}
          onClose={handleClosePopup}
          userInfo={userInfo}
        />
      )}
    </div>
  );
};

export default ProductInfo;
