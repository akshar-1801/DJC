import React, { useState } from "react";
import { FaRegGem } from "react-icons/fa";
import { SiGooglegemini } from "react-icons/si";
import { MdOutlineDiamond } from "react-icons/md";
import { BsXDiamondFill } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import styles from "./GemstoneFilter.module.css";

const GemstoneFilter = ({ onApplyFilters, onResetFilters }) => {
  const [selectedGemstone, setSelectedGemstone] = useState("");
  const [minPrice, setMinPrice] = useState(10000);
  const [minCarat, setMinCarat] = useState(1.0);

  const gemstones = [
    { name: "Diamond", icon: <FaRegGem /> },
    { name: "Emerald", icon: <SiGooglegemini /> },
    { name: "Ruby", icon: <MdOutlineDiamond /> },
    { name: "Sapphire", icon: <BsXDiamondFill /> },
  ];

  const handleApplyFilters = () => {
    onApplyFilters({ selectedGemstone, minPrice, minCarat });
  };

  const handleResetFilters = () => {
    setSelectedGemstone("");
    setMinPrice(10000);
    setMinCarat(1.0);
    onResetFilters();
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.section}>
        <h3>
          Gemstone <IoChevronDown />
        </h3>
        <div className={styles.gemstoneGrid}>
          {gemstones.map((gemstone) => (
            <button
              key={gemstone.name}
              className={`${styles.gemstoneButton} ${
                selectedGemstone === gemstone.name ? styles.selected : ""
              }`}
              onClick={() => setSelectedGemstone(gemstone.name)}
            >
              {gemstone.icon}
              <span>{gemstone.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>
          Price <IoChevronDown />
        </h3>
        <div className={styles.priceInputs}>
          <div className={styles.inputWrapper}>
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              min={10000}
              step={10000}
            />
          </div>
        </div>
        <input
          type="range"
          min={10000}
          max={500000}
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className={styles.priceSlider}
        />
      </div>

      <div className={styles.section}>
        <h3>
          Carat <IoChevronDown />
        </h3>
        <div className={styles.caratInputs}>
          <div className={styles.inputWrapper}>
            <label htmlFor="minCarat">Min Carat</label>
            <input
              type="number"
              id="minCarat"
              value={minCarat}
              onChange={(e) => setMinCarat(Number(e.target.value))}
              min={1.0}
              step={0.01}
            />
          </div>
        </div>
        <input
          type="range"
          min={1.0}
          max={30.0}
          step={0.01}
          value={minCarat}
          onChange={(e) => setMinCarat(Number(e.target.value))}
          className={styles.caratSlider}
        />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.resetButton} onClick={handleResetFilters}>
          Reset
        </button>
        <button className={styles.applyButton} onClick={handleApplyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default GemstoneFilter;
