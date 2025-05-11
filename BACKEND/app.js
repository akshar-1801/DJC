const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");
const formRoutes = require("./routes/proposeIdea.route");
const isLoggedIn = require("./middlewares/isLoggedIn");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");
const cartRoute = require("./routes/cart.route");
const wishlistRoute = require("./routes/wishlist.route");
const cproductRoute = require("./routes/cproduct.route");
const cproductorderRoute = require("./routes/cproduct-order.route");
const gemstoneRoute = require("./routes/gemstone.route");
const authRoute = require("./routes/auth.router");
const paymentRoute = require("./routes/payment.route");

/* Middlewares*/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/hello", (req, res) => {
  res.send("Hello from node API. This is home page");
});
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cproducts", cproductRoute);
app.use("/api/cproduct-order", isLoggedIn, cproductorderRoute);
app.use("/api/gemstones", gemstoneRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/proposeIdea", formRoutes);

connectDB();

module.exports = app;
