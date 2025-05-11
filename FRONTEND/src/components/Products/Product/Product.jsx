import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";

const Product = ({ data, id }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.thumbnail}>
        <img
          loading="lazy"
          src={data.image_urls[0]}
          alt={data.product_name}
          onClick={() => navigate("/products/" + data._id)}
        />
        <button className={styles.wishlistButton} onClick={toggleWishlist}>
          {isWishlisted ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <div className={styles.prodDetails}>
        <span className={styles.name}>{data.product_name}</span>
        <span className={styles.price}>&#8377;{data.price}</span>
      </div>
    </div>
  );
};

export default Product;
