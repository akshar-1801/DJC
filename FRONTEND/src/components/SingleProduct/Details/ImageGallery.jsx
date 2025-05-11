// ImageGallery.jsx
import React, { useState, useEffect, useContext } from "react";
import styles from "./ImageGallery.module.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Context } from "../../../utils/context";
import { useNavigate } from "react-router-dom";

const ImageGallery = ({ data }) => {
  const [mainImage, setMainImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { setSelectedSetting } = useContext(Context);
  const navigate = useNavigate();
  // const images = [
  //   "https://blingbox.in/cdn/shop/products/antique-square-tassel-earrings-bling-box-jewellery-30558003364028.jpg?v=1661331072&width=1080",
  //   "https://www.voylla.com/cdn/shop/products/PRBOM20048_CS.jpg?v=1692788246",
  //   "https://i.pinimg.com/736x/3b/4a/81/3b4a8145378ac027f861c95c765a8f24.jpg",
  //   "https://artofgold.in/wp-content/uploads/2023/09/M26.jpg",
  // ];
  const images =
    data && Array.isArray(data.image_urls) ? [...data.image_urls] : [];
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setShowNotification(true);
  };

  const personalizeProduct = () => {
    setSelectedSetting(data);
    navigate("/personalize");
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img src={images[mainImage]} alt="Product" />
        <button className={styles.wishlistButtonr} onClick={toggleWishlist}>
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
        <button className={styles.wishlistButtonl} onClick={personalizeProduct}>
          <FaWandMagicSparkles />
        </button>
      </div>
      <div className={styles.thumbnails}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              mainImage === index ? styles.active : ""
            }`}
            onClick={() => setMainImage(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      {showNotification && (
        <div className={styles.notification}>
          {isWishlisted ? "Added to wishlist" : "Removed from wishlist"}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
