// CustomerReview.jsx
import React from 'react';
import styles from './CustomerReview.module.css';

const CustomerReview = () => {
  return (
    <div className={styles.customerReview}>
      <h3>Customer Review:</h3>
      <button className={styles.writeReview}>✎ Write Your Review</button>
    </div>
  );
};

export default CustomerReview;