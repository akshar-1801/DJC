import React, { useEffect, useContext, useState, useCallback, memo, useRef, useTransition } from "react";
import PersonalizedPage1 from "../../components/Personalization/PersonalizedPage1";
import styles from "./Customization_Page.module.css";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const MemoizedPersonalizedPage1 = memo(PersonalizedPage1, (prev, next) => {
  return (
    prev.checkPageOne === next.checkPageOne &&
    JSON.stringify(prev.initialGems) === JSON.stringify(next.initialGems) &&
    JSON.stringify(prev.initialSettings) === JSON.stringify(next.initialSettings)
  );
});

function Personalize_Page({ checkPageOne }) {
  const [isPending, startTransition] = useTransition();
  const [gemstones, setGemstones] = useState([]);
  const { products, setProducts } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  // Batch update function
  const batchUpdateData = useCallback((gemstonesData, productsData) => {
    startTransition(() => {
      if (JSON.stringify(gemstones) !== JSON.stringify(gemstonesData)) {
        setGemstones(gemstonesData);
      }
      if (JSON.stringify(products) !== JSON.stringify(productsData)) {
        setProducts(productsData);
      }
    });
  }, [products, gemstones, setProducts]);

  // Single effect for data fetching
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [gemstonesRes, productsRes] = await Promise.all([
          fetchDataFromApi("/api/gemstones"),
          fetchDataFromApi("/api/products")
        ]);

        const finalProducts = productsRes.length > 0 ? productsRes : initialProducts;
        batchUpdateData(gemstonesRes, finalProducts);
      } catch (error) {
        console.error("Data fetch error:", error);
        batchUpdateData([], initialProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [batchUpdateData]);

  // Memoize props
  const personalizedPageProps = React.useMemo(() => ({
    checkPageOne,
    initialGems: gemstones,
    initialSettings: products
  }), [checkPageOne, gemstones, products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("Customisedpage Rendering");
  
  return <MemoizedPersonalizedPage1 {...personalizedPageProps} />;
}

export default memo(Personalize_Page);