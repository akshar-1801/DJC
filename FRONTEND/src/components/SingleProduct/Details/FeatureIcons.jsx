// FeatureIcons.jsx
import React from 'react';
import styles from './FeatureIcons.module.css';
import { IoPricetagsOutline } from "react-icons/io5";
import { LiaCertificateSolid } from "react-icons/lia";
import { BsBookmarkCheck } from "react-icons/bs";
import { RiExchangeLine } from "react-icons/ri";
import { RiExchangeFundsFill } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";

const FeatureIcons = () => {
  const features = [
    { icon: <IoPricetagsOutline />, name: 'Best Designs' },
    { icon: <LiaCertificateSolid />, name: 'Certified Diamonds' },
    { icon: <BsBookmarkCheck />, name: 'BIS Hallmark' },
    { icon: <RiExchangeLine />, name: 'Easy Exchange' },
    { icon: <RiExchangeFundsFill />, name: 'Lifetime Exchange' },
    { icon: <LiaShippingFastSolid />, name: 'Insured Shipping' }
  ];

  return (
    <div className={styles.featureIcons}>
      {features.map((feature, index) => (
        <div key={index} className={styles.feature}>
          <span className={styles.icon}>{feature.icon}</span>
          <span className={styles.name}>{feature.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FeatureIcons;