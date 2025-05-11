import React, { useEffect, useContext, useState } from "react";
import styles from "./Products_Page.module.css";
import Products from "../../components/Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

function Products_Page() {
  const { products, setProducts } = useContext(Context);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchDataFromApi("/api/products");
        // console.log("API response:", res);
        setProducts(res.length > 0 ? res : initialProducts);
      } catch (error) {
        // console.error("Error fetching products:", error);
        setProducts(initialProducts);
      }
    };

    getProducts();
  }, [setProducts]);

  return <Products products={products} />;
}

export default Products_Page;
