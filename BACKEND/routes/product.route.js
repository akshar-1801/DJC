const express = require("express");
const {
  getProductsList,
  getProductById,
  addProduct,
  searchProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getProductsList);

router.get("/:id", getProductById);

router.get("/query/:query", searchProduct);

router.post("/", addProduct);

module.exports = router;
