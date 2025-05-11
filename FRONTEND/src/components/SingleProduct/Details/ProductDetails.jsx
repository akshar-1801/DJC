// ProductDetails.jsx
import React, { useState, useRef, useEffect } from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ data }) => {
  const [activeSection, setActiveSection] = useState("metal");
  const contentRefs = useRef({});

  const productDesc = data?.description || "Product Description Not Available";
  const productRating = data?.avg_rating || "Product Rating Not Available";
  const productGender = data?.gender || "Product Description Not Available";
  const materials = data?.materials || []; // Array of material strings

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    Object.keys(contentRefs.current).forEach((key) => {
      const content = contentRefs.current[key];
      if (content) {
        content.style.maxHeight =
          activeSection === key ? `${content.scrollHeight}px` : "0px";
      }
    });
  }, [activeSection]);

  return (
    <div className={styles.productDetails}>
      <h2>Product Details</h2>
      <div className={styles.section}>
        <h3 onClick={() => toggleSection("metal")}>
          Product Information
          <span className={styles.icon}>
            {activeSection === "metal" ? "-" : "+"}
          </span>
        </h3>
        <div
          ref={(el) => (contentRefs.current["metal"] = el)}
          className={styles.content}
        >
          <p>{productDesc}</p>
          <p>Rating : {productRating}</p>
          <p>Gender : {productGender}</p>
        </div>
      </div>
      <div className={styles.section}>
        <h3 onClick={() => toggleSection("product")}>
          Materials Used
          <span className={styles.icon}>
            {activeSection === "product" ? "-" : "+"}
          </span>
        </h3>
        <div
          ref={(el) => (contentRefs.current["product"] = el)}
          className={styles.content}
        >
          {materials.length > 0 ? (
            <ul className={styles.materialList}>
              {materials.map((material, index) => (
                <li key={index} className={styles.materialItem}>
                  {material}
                </li>
              ))}
            </ul>
          ) : (
            <p>Material information not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
