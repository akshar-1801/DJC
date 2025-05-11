const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");
const CProduct = require("../models/cproduct.model");
const Product = require("../models/product.model");
const Gemstone = require("../models/gemstone.model");

const getAllOrders = async (req, res) => {
  try {
    const orderList = await Order.find().sort({ order_datetime: -1 });
    res.status(200).json(orderList);
  } catch (err) {
    res.status(500).json({ message: "Orders not found" });
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

const getOrdersByUser = async (req, res) => {
  try {
    const userid = req.params.userid;

          // userid to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userid);

    const orders = await Order.aggregate([
      {
        $match: { user_id: userObjectId },
      },
      {
        $lookup: {
          from: "orderitems", //MongoDB uses the lowercase collection name
          localField: "_id",
          foreignField: "order_id",
          as: "orderItems",
        },
      },
    ]);
    if (!orders || orders.length == 0) {
      return res.status(404).json({ message: "No orders found for the user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching orders for the user",
        error: error.message,
      });
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
      cproducts,
      shipping_date,
      delivery_date,
      status,
      delivery_charge,
      payment_method,
      shipping_address,
    } = req.body;

    let total_price = 0;
    const orderItems = [];

    for (const productInfo of cproducts) {
      const cproduct = await CProduct.findById(productInfo.cproduct_id);
      if (!cproduct)
        throw new Error(`Product not found: ${productInfo.cproduct_id}`);

      const product = await Product.findById(productInfo.product_id);
      if (!product) {
        throw new Error(
          `Product not found or price is missing: ${productInfo.product_id}`
        );
      }
      const itemPrice1 = product.price; //* productInfo.quantity;
      total_price += itemPrice1;

      const gemstone = await Gemstone.findById(productInfo.gemstone_id);
      if (!gemstone) {
        throw new Error(`Gemstone not found: ${productInfo.gemstone_id}`);
      }
      total_price += gemstone.price;

      orderItems.push({
        product_id: productInfo.cproduct_id,
        quantity: 1,
        price: total_price,
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

module.exports = {
  getOrdersByUser,
  getOrdersByDate,
  getAllOrders,
  getOrdersbyStatus,
  createOrder,
};
