const express = require("express");
const {
  getCProductsList,
  getCProductById,
  addCProduct,
} = require("../controllers/cproduct.controller");
const router = express.Router();

router.get("/", getCProductsList);

router.get("/:id", getCProductById);

router.post("/", addCProduct);

module.exports = router;
