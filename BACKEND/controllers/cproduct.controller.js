const CProduct = require("../models/cproduct.model");
const Gemstone = require("../models/gemstone.model");
const Product = require("../models/product.model");
const { sendCProductReachedEmail } = require("../services/emailServices");

const getCProductsList = async (req, res) => {
  try {
    const cproductsList = await CProduct.find()
      .populate("gemId") // Populates the gemId field
      .populate("settingId"); // Populates the settingId field

    res.status(200).json(cproductsList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const cproduct = await CProduct.findById(id);
    res.status(200).json(cproduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCProduct = async (req, res) => {
  try {
    const createdProduct = await CProduct.create(req.body);
    await sendCProductReachedEmail(req.body.userEmail, req.body);
    res.status(201).json(createdProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCProductsList,
  getCProductById,
  addCProduct,
};
