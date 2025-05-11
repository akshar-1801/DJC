import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import ImageGallery from "./Personalize/ImageGallery";
import ProductInfo from "./Personalize/ProductInfo";
import styles from "./PersonalizedPage1.module.css";
import DiamondFunnel from "./Personalize/DiamondFunnel";
import Products from "./Personalize/Products";
import GemstoneFilter from "./Personalize/GemstoneFilter";
import Filters from "./Personalize/Filters";
import Propose from "./UploadImage/Propose";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../utils/context";

const filterGems = (gems, filters) => {
  return gems.filter((gem) => {
    const matchesGemstone =
      !filters.selectedGemstone ||
      gem.gemstoneCategory === filters.selectedGemstone;
    const matchesPrice =
      filters.minPrice === undefined || gem.price >= filters.minPrice;
    const matchesCarat =
      filters.minCarat === undefined || gem.carat >= filters.minCarat;
    return matchesGemstone && matchesPrice && matchesCarat;
  });
};

const PersonalizedPage1 = ({ checkPageOne, initialGems, initialSettings }) => {
  const { selectedGem, setSelectedGem, selectedSetting, setSelectedSetting } =
    useContext(Context);
  const [filteredGems, setFilteredGems] = useState(initialGems);
  const [filteredSettings, setFilteredSettings] = useState(initialSettings);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [chooseGem, setChooseGem] = useState(true);
  const [isPageOne, setIsPageOne] = useState(checkPageOne);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const personalizationPaths = ["/personalize", "/uploadIdea"];

    if (!personalizationPaths.includes(location.pathname)) {
      setSelectedGem(null);
      setSelectedSetting(null);
    }
  }, [location, setSelectedGem, setSelectedSetting]);

  useEffect(() => {
    setFilteredGems(initialGems);
  }, [initialGems]);

  const handleApplyFilters = useCallback(
    (filters) => {
      setFilteredGems(filterGems(initialGems, filters));
    },
    [initialGems]
  );

  const handleResetFilters = useCallback(() => {
    setFilteredGems(initialGems);
    setAppliedFilters({});
  }, [initialGems]);

  const handleGemSelect = useCallback((gem) => {
    setSelectedGem(gem);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const handleSettingSelect = useCallback((setting) => {
    setSelectedSetting(setting);
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, []);

  const handleRemoveGem = useCallback(() => {
    setSelectedGem(null);
  }, []);

  const handleRemoveSetting = useCallback(() => {
    setSelectedSetting(null);
  }, []);

  const handleFilterChange = useCallback((filter, value) => {
    setAppliedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: value };
      if (!value) {
        delete newFilters[filter];
      }
      return newFilters;
    });
  }, []);

  const handleChooseGem = useCallback(() => {
    setChooseGem(true);
    setAppliedFilters({});
    setFilteredGems(initialGems); // Reset to initial gems when switching to gem selection
  }, [initialGems]);

  const handleChooseSetting = useCallback(() => {
    setChooseGem(false);
    setFilteredGems(initialGems);
  }, [initialGems]);

  const handlePage1 = useCallback(() => {
    setIsPageOne(true);
    navigate("/personalize");
  }, [navigate]);

  const handlePage2 = useCallback(() => {
    setIsPageOne(false);
    navigate("/uploadIdea");
  }, [navigate]);

  const memoizedFilteredSettings = useMemo(() => {
    return initialSettings.filter((product) => {
      for (const [filter, value] of Object.entries(appliedFilters)) {
        if (filter === "price") {
          if (value === "under-100" && product.price > 100) return false;
          if (value === "under-500" && product.price > 500) return false;
          if (value === "under-1000" && product.price > 1000) return false;
        } else if (
          filter === "category" &&
          product.category.toLowerCase() !== value.toLowerCase()
        ) {
          return false;
        } else if (
          filter === "material" &&
          product.material.toLowerCase() !== value.toLowerCase()
        ) {
          return false;
        } else if (
          filter === "gender" &&
          product.gender.toLowerCase() !== value.toLowerCase()
        ) {
          return false;
        }
      }
      return true;
    });
  }, [appliedFilters, initialSettings]);

  useEffect(() => {
    setFilteredSettings(memoizedFilteredSettings);
  }, [memoizedFilteredSettings]);


  return (
    <div className={styles.Personalized}>
      <div className={styles.title}>
        <h1>PERSONALIZE YOUR SPARKLE</h1>
        <div className={styles.btns}>
          <button
            className={isPageOne ? styles.button51 : styles.button50}
            onClick={handlePage1}
          >
            ALCHEMY
          </button>
          <button
            className={isPageOne ? styles.button50 : styles.button51}
            onClick={handlePage2}
          >
            PROPOSE
          </button>
        </div>
      </div>
      {isPageOne ? (
        <div className={styles.container}>
          <div className={styles.PersonalizedPage1}>
            <div className={styles.leftColumn}>
              <ImageGallery
                selectedGem={selectedGem}
                selectedSetting={selectedSetting}
              />
            </div>
            <div className={styles.rightColumn}>
              <ProductInfo
                selectedGem={selectedGem}
                selectedSetting={selectedSetting}
              />
            </div>
          </div>
          <div className={styles.funnelContainer}>
            <DiamondFunnel
              selectedGem={selectedGem}
              onRemoveGem={handleRemoveGem}
              selectedSetting={selectedSetting}
              onRemoveSetting={handleRemoveSetting}
              onChooseDiamond={handleChooseGem}
              onChooseSetting={handleChooseSetting}
            />
          </div>
          {chooseGem ? (
            <GemstoneFilter
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <Filters onFilterChange={handleFilterChange} />
          )}
          <Products
            products={chooseGem ? filteredGems : filteredSettings}
            onProductSelect={chooseGem ? handleGemSelect : handleSettingSelect}
            productType={chooseGem ? "gem" : "setting"}
          />
        </div>
      ) : (
        <Propose />
      )}
    </div>
  );
};

export default React.memo(PersonalizedPage1);
