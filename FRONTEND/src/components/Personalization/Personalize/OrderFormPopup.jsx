import React, { useContext, useEffect, useState } from "react";
import styles from "./OrderFormPopup.module.css";
import { Context } from "../../../utils/context";
import { postData } from "../../../utils/api";

const OrderFormPopup = ({
  selectedGem,
  selectedSetting,
  onClose,
  userInfo,
}) => {
  const [formData, setFormData] = useState({
    user_id: userInfo.user_id, // user id
    title: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    country: "India",
    subject: "",
    message: "",
    size: "",
    quantity: 1,
    userEmail: userInfo.email, // Include user's email
  });

  const [errors, setErrors] = useState({});
  const { setSelectedGem, setSelectedSetting } = useContext(Context);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.size) newErrors.size = "Size is required";
    if (formData.quantity < 1)
      newErrors.quantity = "Quantity must be at least 1";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const orderData = {
        gemId: selectedGem._id,
        settingId: selectedSetting._id,
        ...formData,
      };
      // console.log("Order Details:", orderData);

      try {
        const result = await postData("/api/cproducts", orderData);
        // console.log("Order submitted successfully:", result);

        setSelectedGem(null);
        setSelectedSetting(null);

        onClose();
      } catch (error) {
        // console.error("Error submitting order:", error);
      }
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${styles.animatePopup}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modalTitle}>Complete Your Order</h2>
        <form onSubmit={handleSubmit} className={styles.orderForm}>
          <div className={styles.formRow}>
            <label htmlFor="title">Title*</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? styles.inputError : ""}
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
            </select>
            {errors.title && (
              <span className={styles.errorMessage}>{errors.title}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? styles.inputError : ""}
            />
            {errors.firstName && (
              <span className={styles.errorMessage}>{errors.firstName}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="lastName">Last Name*</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? styles.inputError : ""}
            />
            {errors.lastName && (
              <span className={styles.errorMessage}>{errors.lastName}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? styles.inputError : ""}
            />
            {errors.phoneNumber && (
              <span className={styles.errorMessage}>{errors.phoneNumber}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.inputError : ""}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="country">Country/Region*</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              readOnly
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="subject">Subject*</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={errors.subject ? styles.inputError : ""}
            >
              <option value="">Select Subject</option>
              <option value="Order">Order</option>
              <option value="Inquiry">Inquiry</option>
              <option value="Feedback">Feedback</option>
            </select>
            {errors.subject && (
              <span className={styles.errorMessage}>{errors.subject}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="size">Size*</label>
            <select
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={errors.size ? styles.inputError : ""}
            >
              <option value="">Select Size</option>
              {selectedSetting.size_list.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.size && (
              <span className={styles.errorMessage}>{errors.size}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <label htmlFor="quantity">Quantity*</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? styles.inputError : ""}
            />
            {errors.quantity && (
              <span className={styles.errorMessage}>{errors.quantity}</span>
            )}
          </div>
          <div className={styles.actions}>
            <button type="submit" className={styles.submitButton}>
              Submit Order
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderFormPopup;
