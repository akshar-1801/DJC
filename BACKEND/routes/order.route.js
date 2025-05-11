const express = require("express");
const {
  getOrdersByUserId,
  getOrdersByDate,
  getAllOrders,
  getOrdersbyStatus,
  createOrder,
  updateDeliveryStatus,
} = require("../controllers/order.controller");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.get("/", getAllOrders);

router.get("/status/:status", getOrdersbyStatus);

router.get("/user/:userid", getOrdersByUserId);

router.put("/:paymentId", isLoggedIn, updateDeliveryStatus);

router.get("/date/:date", getOrdersByDate);

router.post("/create-order/:userid", createOrder);

module.exports = router;
