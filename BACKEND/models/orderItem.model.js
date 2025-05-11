const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
  order_id: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);
module.exports = OrderItem;
