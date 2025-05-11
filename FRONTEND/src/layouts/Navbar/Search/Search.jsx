import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import styles from "./Search.module.css";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  let { data } = useFetch(query ? `/api/products/query/${query}` : null);

  // Ensure data is always an array, or set it to an empty array if not
  if (!Array.isArray(data)) {
    data = [];
  }

  return (
    <div className={styles.searchModal}>
      <div className={styles.formField}>
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
          className={styles.input}
        />
        <MdClose
          className={styles.closeBtn}
          onClick={() => setSearchModal(false)}
        />
      </div>
      <div className={styles.searchResultContent}>
        {!query.length ? (
          <div className={styles.startMsg}>
            Start typing to see products you are looking for...
          </div>
        ) : !data.length ? (
          <div className={styles.startMsg}>
            No products found matching your search.
          </div>
        ) : (
          <div className={styles.searchResults}>
            {data.map((item) => (
              <div
                className={styles.searchResultItem}
                key={item._id}
                onClick={() => {
                  navigate("/products/" + item._id);
                  setSearchModal(false);
                }}
              >
                <div className={styles.imageContainer}>
                  <img src={item.image_urls[0]} alt={item.title} />
                </div>
                <div className={styles.prodDetails}>
                  <span className={styles.name}>{item.product_name}</span>
                  <span className={styles.desc}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
