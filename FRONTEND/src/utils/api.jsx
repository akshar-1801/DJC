import axios from "axios";
import React, { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Your backend URL

// Axios instance for making API requests
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to fetch data
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Function to update data
export const updateData = async (url, updatedData) => {
  const user = useUser();
  try {
    const { data } = await axiosInstance.put(url, updatedData);
    return data;
  } catch (err) {
    console.error("Error updating data:", err.response || err.message);
    throw err;
  }
};
// Function to post data
export const postData = async (url, newData) => {
  try {
    const { data } = await axiosInstance.post(url, newData);
    return data;
  } catch (err) {
    console.error("Error posting data:", err.response || err.message);
    throw err;
  }
};

export const makePaymentRequest = axios.create({
  baseURL: "http://localhost:3000", // Update with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});
