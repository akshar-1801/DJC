import React, { useState, useEffect } from "react";
import styles from "./DiamondFunnel.module.css";
import { RiVipDiamondLine } from "react-icons/ri";
import { CgRing } from "react-icons/cg";
import { GiBigDiamondRing } from "react-icons/gi";

const DiamondFunnel = ({ selectedGem, onRemoveGem, selectedSetting, onRemoveSetting, onChooseDiamond, onChooseSetting }) => {
  const [diamond, setDiamond] = useState(selectedGem);
  const [setting, setSetting] = useState(selectedSetting);

  useEffect(() => {
    setDiamond(selectedGem);
    setSetting(selectedSetting);
  }, [selectedGem, selectedSetting]);

  const handleRemoveDiamond = () => {
    setDiamond(null);
    onRemoveGem(); 
  };

  const handleRemoveSetting = () => {
    setSetting(null);
    onRemoveSetting();
  }

  const handleChooseDiamondClick = () => {
    if (!diamond) {
      onChooseDiamond();
    }
  };

  const handleChooseSettingClick = () => {
    if (!setting) {
      onChooseSetting();
    }
  };

  const calculateTotal = () => {
    if (diamond && setting) {
      return diamond.price + setting.price;
    }
    return null;
  };

  return (
    <>
      <div className={styles.funnel}>
        <div className={styles.step} >
          {!diamond ? (
            <>
              <span className={styles.number}>1</span>
              <span className={styles.text} onClick={handleChooseDiamondClick}>Choose a Diamond</span>
              <span className={styles.icon}>
                <RiVipDiamondLine />
              </span>
            </>
          ) : (
            <>
              <span className={styles.checkmark}>✓</span>
              <div className={styles.selection}>
                <span>{diamond.product_name}</span>
                <div>
                  <span>${diamond.price.toLocaleString()}</span>
                  <button className={styles.viewButton}>View</button>
                  <button
                    className={styles.removeButton}
                    onClick={handleRemoveDiamond}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <img
                src={diamond.image_url}
                className={styles.itemImage}
                alt={diamond.name}
              />
            </>
          )}
        </div>

        <div className={styles.step} >
          {!setting ? (
            <>
              <span className={styles.number}>2</span>
              <span className={styles.text} onClick={handleChooseSettingClick} >Choose a Setting</span>
              <span className={styles.icon}>
                <CgRing />
              </span>
            </>
          ) : (
            <>
              <span className={styles.checkmark}>✓</span>
              <div className={styles.selection}>
                <span>{setting.product_name}</span>
                <div>
                  <span>${setting.price.toLocaleString()}</span>
                  <button className={styles.viewButton}>View</button>
                  <button
                    className={styles.removeButton}
                    onClick={handleRemoveSetting}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <img
                src={setting.image_urls[0]}
                className={styles.itemImage}
                alt={setting.name}
              />
            </>
          )}
        </div>

        <div className={styles.step}>
          {!diamond || !setting ? (
            <>
              <span className={styles.number}>3</span>
              <span className={styles.text}>Complete Design</span>
              <span className={styles.icon}>
                <GiBigDiamondRing />
              </span>
            </>
          ) : (
            <>
              <span className={styles.checkmark}>✓</span>
              <div className={styles.selection}>
                <span>Complete Design</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
              <span className={styles.icon}>
                <GiBigDiamondRing />
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DiamondFunnel;
