import React, { useState } from "react";
import Product from "./Product/Product";
import Filters from "./Filters/Filters";
import styles from "./Products.module.css";

const Products = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterChange = (filter, value) => {
    // Update the applied filters
    setAppliedFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [filter]: value };

      // If the filter value is empty, remove the filter
      if (!value) {
        delete newFilters[filter];
      }

      return newFilters;
    });
  };

  React.useEffect(() => {
    let filtered = [...products];

    // Apply all active filters
    for (const [filter, value] of Object.entries(appliedFilters)) {
      if (filter === "price") {
        if (value === "under-100000") {
          filtered = filtered.filter((product) => product.price <= 100000);
        } else if (value === "under-500000") {
          filtered = filtered.filter((product) => product.price <= 500000);
        } else if (value === "under-1000000") {
          filtered = filtered.filter((product) => product.price <= 1000000);
        }
      } else if (filter === "category") {
        filtered = filtered.filter(
          (product) => product.category.toLowerCase() === value.toLowerCase()
        );
      } else if (filter === "material") {
        filtered = filtered.filter(
          (product) => product.material.toLowerCase() === value.toLowerCase()
        );
      } else if (filter === "gender") {
        filtered = filtered.filter(
          (product) => product.gender.toLowerCase() === value.toLowerCase()
        );
      }
    }

    setFilteredProducts(filtered);
  }, [appliedFilters, products]);

  return (
    <div className={styles.productsContainer}>
      <Filters onFilterChange={handleFilterChange} />
      <div className={styles.products}>
        {filteredProducts.map((item) => (
          <Product key={item._id} id={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
