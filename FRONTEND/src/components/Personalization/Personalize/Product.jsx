import React from "react";
import styles from "./Product.module.css";

const Product = ({ data, onClick, productType }) => {
  return (
    <div className={styles.productCard} onClick={() => onClick(data)}>
      <div className={styles.thumbnail}>
        <img
          loading="lazy"
          src={productType === "gem" ? data.image_url : data.image_urls[0]}
        />
      </div>
      <div className={styles.prodDetails}>
        <span className={styles.name}>{data.product_name}</span>
        <span className={styles.price}>
          &#8377;{data.price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Product;
