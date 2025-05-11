import React from "react";
import styles from "./ProductModal.module.css";

const ProductModal = ({ data, onClose, onSelectDiamond, productType }) => {
  const handleSelect = () => {
    onSelectDiamond(data); // Pass the selected product data back to PersonalizedPage1
    onClose(); // Close the modal after selection
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.modalBody}>
          <div className={styles.imageContainer}>
            <img
              src={productType === "gem" ? data.image_url : data.image_urls[0]}
              alt={data.name || data.product_name}
            />
          </div>
          <div className={styles.detailsContainer}>
            <h2 className={styles.productName}>
              {data.name || data.product_name}
            </h2>
            <span className={styles.price}>&#8377;{data.price}</span>

            {productType === "gem" ? (
              <>
                <p className={styles.detailItem}>
                  <strong>Category:</strong> {data.gemstoneCategory}
                </p>
                <p className={styles.detailItem}>
                  <strong>Carat:</strong> {data.carat}
                </p>
                <p className={styles.detailItem}>
                  <strong>Color:</strong> {data.color}
                </p>
                <p className={styles.detailItem}>
                  <strong>Clarity:</strong> {data.clarity}
                </p>
                <p className={styles.detailItem}>
                  <strong>Cut:</strong> {data.cut}
                </p>
              </>
            ) : (
              <>
                <p className={styles.detailItem}>
                  <strong>Description:</strong> {data.description}
                </p>
                {/* <p className={styles.detailItem}>
                  <strong>Materials:</strong>{" "}
                  {data.materials ? data.materials.join(", ") : "N/A"}
                </p> */}
                <p className={styles.detailItem}>
                  <strong>Average Rating:</strong> {data.avg_rating || "N/A"}
                </p>
                <p className={styles.detailItem}>
                  <strong>Category:</strong> {data.category}
                </p>
                <p className={styles.detailItem}>
                  <strong>Gender:</strong> {data.gender}
                </p>
              </>
            )}

            <button className={styles.button51} onClick={handleSelect}>
              {productType === "gem" ? "Select Gem" : "Select Setting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
