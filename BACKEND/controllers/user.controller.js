

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const Wishlist = require("../models/wishlist.model");
const {generateToken} = require("../utils/generateToken")


const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.find().select('-password');
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserProfile = async (req, res) => {
  res.status(200).json(req.user);
};


module.exports = {
  getUsers,
  getUserProfile,
  authMiddleware
};