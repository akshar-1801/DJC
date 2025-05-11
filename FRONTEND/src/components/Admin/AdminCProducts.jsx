import React, { useEffect, useState } from "react";
import styles from "./AdminCProducts.module.css";
import { fetchDataFromApi } from "../../utils/api";
import axios from "axios";

const AdminCProducts = () => {
  const [cProducts, setCProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-info"));
    if (userData) {
      setUser({
        id: userData.user_id,
        name: userData.name,
        token: userData.token,
      });
    }
  }, []);

  // Fetch all CProducts when the component loads
  useEffect(() => {
    const fetchCProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchDataFromApi("/api/cproducts");
        // console.log(res);

        setCProducts(res);
      } catch (error) {
        console.error("Error fetching CProducts:", error);
        setCProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.cProductsContainer}>
      <h1 className={styles.title}>Admin Panel - Customized Products</h1>
      <div className={styles.cProductsTable}>
        <table className={styles.paymentTable}>
          <thead>
            <tr>
              {/* <th>Order ID</th> */}
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Size</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cProducts?.map((cProduct) => (
              <tr key={cProduct._id}>
                {/* <td>{cProduct._id}</td> */}
                <td>{cProduct.title}</td>
                <td>{`${cProduct.firstName} ${cProduct.lastName}`}</td>
                <td>{cProduct.email}</td>
                <td>{cProduct.phoneNumber}</td>
                <td>{cProduct.subject}</td>
                <td>{cProduct.message}</td>
                <td>{cProduct.size}</td>
                <td>{cProduct.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCProducts;
