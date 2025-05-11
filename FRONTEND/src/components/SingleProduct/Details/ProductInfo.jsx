// ProductInfo.jsx
import React, { useContext } from "react";
import styles from "./ProductInfo.module.css";
import { Context } from "../../../utils/context";

const ProductInfo = ({ data }) => {
  // Use optional chaining and default values
  const { handleAddToCart } = useContext(Context);
  const productName = data?.product_name || "Product Name Not Available";
  const productCategory = data?.category || "Type Not Specified";
  const price = data?.price ? `₹${data.price}` : "Price Not Available";
  const savings = data?.savings ? `You Save ₹${data.savings}` : "";
  const productCode = data?._id || "Product Code Not Defined";
  const sizeList = data?.size_list || [];
  const quantity = 1;

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.title}>{productName}</h1>
      <p className={styles.jeweller}>
        By DJC Jeweller | Product Code: {productCode}
      </p>
      <p className={styles.type}>{productCategory}</p>
      <div className={styles.pricing}>
        <span className={styles.price}>{price}</span>
        {savings && <span className={styles.savings}>{savings}</span>}
      </div>
      <p className={styles.taxes}>(Inclusive of all taxes)</p>
      <div className={styles.size}>
        <label htmlFor="size">SIZE:</label>
        <select id="size">
          <option value="">Select Size</option>
          {sizeList.map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.button50}
          onClick={() => {
            handleAddToCart(data, quantity);
          }}
        >
          ADD TO CART
        </button>
        {/* <button className={styles.button51}>BUY NOW</button> */}
      </div>
    </div>
  );
};

export default ProductInfo;
