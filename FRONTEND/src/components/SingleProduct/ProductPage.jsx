import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.css";
import ImageGallery from "./Details/ImageGallery";
import ProductInfo from "./Details/ProductInfo";
import ProductDetails from "./Details/ProductDetails";
import CustomerReview from "./Details/CustomerReview";
import FeatureIcons from "./Details/FeatureIcons";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";

const ProductPage = () => {
  const { prodId } = useParams();
  const [product, setProduct] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchDataFromApi(`/api/products/${prodId}`);
        setProduct(res);
      } catch (error) {
        setProduct({});
      }
    };
    getProducts();
  }, [prodId]);

  // Update the mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.productPage}>
        <div className={styles.leftColumn}>
          <ImageGallery data={product} />
          {/* Show FeatureIcons and CustomerReview only in desktop view */}
          {!isMobile && <FeatureIcons data={product} />}
          {/* {!isMobile && <CustomerReview data={product} />} */}
        </div>
        <div className={styles.rightColumn}>
          <ProductInfo data={product} />
          <ProductDetails data={product} />
          {/* Show FeatureIcons and CustomerReview here in mobile view */}
          {isMobile && <FeatureIcons data={product} />}
          {/* {isMobile && <CustomerReview data={product} />} */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
