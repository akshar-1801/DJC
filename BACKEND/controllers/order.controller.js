const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");
const Payment = require("../models/payment.model"); // Import the Payment model

const getAllOrders = async (req, res) => {
  try {
    const orders = await Payment.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
    const orders = await Payment.find().sort({ createdAt: -1 });
    res.json(orders);
  }
};
const getOrdersbyStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const orderList = await Order.find({ status: status });
    if (orderList.length == 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(201).json(orderList);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders by status" });
  }
};
const getOrdersByUserId = async (req, res) => {
  const { userid } = req.params;

  try {
    const orders = await Payment.find({ user_id: userid });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByDate = async (req, res) => {
  try {
    const dateString = req.params.date;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD" });
    }

    const orders = await Order.find({
      $expr: {
        $eq: [
          { $substr: [{ $toString: "$order_datetime" }, 0, 10] },
          dateString,
        ],
      },
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for the specified date" });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      products,
      shipping_date,
      delivery_date,
      status,
      delivery_charge,
      payment_method,
      shipping_address,
    } = req.body;

    let total_price = 0;
    const orderItems = [];

    for (const productInfo of products) {
      const product = await Product.findById(productInfo.product_id);
      if (!product)
        throw new Error(`Product not found: ${productInfo.product_id}`);

      const itemPrice = product.price * productInfo.quantity;
      total_price += itemPrice;

      orderItems.push({
        product_id: productInfo.product_id,
        quantity: productInfo.quantity,
        price: product.price,
      });
    }

    const total_amount = total_price + delivery_charge;

    const order = new Order({
      user_id,
      shipping_date,
      delivery_date,
      status,
      total_price,
      delivery_charge,
      total_amount,
      payment_method,
      shipping_address,
    });

    await order.save();

    const savedOrderItems = await Promise.all(
      orderItems.map((item) =>
        new OrderItem({
          order_id: order._id,
          ...item,
        }).save()
      )
    );

    res.status(201).json({
      message: "Order created successfully",
      order,
      orderItems: savedOrderItems,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDeliveryStatus = async (req, res) => {
  const { paymentId } = req.params; // Should match the route parameter in router
  const { delivery_status } = req.body; // New delivery status from request body

  try {
    // Update delivery status
    const updatedPayment = await Payment.findByIdAndUpdate(
      paymentId,
      { delivery_status },
      { new: true } // Return the updated document
    );

    if (!updatedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  updateDeliveryStatus,
  getOrdersByUserId,
  getOrdersByDate,
  getAllOrders,
  getOrdersbyStatus,
  createOrder,
};
