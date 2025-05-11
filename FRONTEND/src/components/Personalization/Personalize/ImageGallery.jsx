import React from "react";
import styles from "./ImageGallery.module.css";
import settingImage from "../../../assets/ringbg.png";
import gImage from "../../../assets/diamondbg.png";

const ImageGallery = ({ selectedGem, selectedSetting }) => {
  const mainImage = settingImage;
  const gemImage = gImage;

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <img
          className={styles.main}
          src={selectedSetting == null ? mainImage : selectedSetting.image_urls[0]}
          alt="Product"
        />
        <img
          className={styles.gem}
          src={selectedGem == null ? gemImage : selectedGem.image_url}
          alt="Gem"
        />
      </div>
    </div>
  );
};

export default ImageGallery;
