const express = require("express");
const { addCartItem, getCartItems,deleteCartItem } = require("../controllers/cart.controller");
const router = express.Router();

router.get("/:userid/view-items", getCartItems);

router.post("/:userid/add-item", addCartItem);

router.delete("/delete-cart-item/:cart_item_id", deleteCartItem);


module.exports = router;
