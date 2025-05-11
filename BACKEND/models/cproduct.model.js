const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CProductSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gemId: {
    type: Schema.Types.ObjectId,
    ref: "Gemstone",
    required: true,
  },
  settingId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CProduct = mongoose.model("CProduct", CProductSchema);
module.exports = CProduct;
