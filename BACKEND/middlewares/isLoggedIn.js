const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async function (req, res, next) {
  // Check if the Authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("login first");
    return res.redirect("/");
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("login first");
    return res.redirect("/");
  }

  try {
    // Verify the token
    let decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded _id matches the admin ID
    if (decoded._id !== process.env.ADMIN_ID) {
      console.log("Not an admin");
      return res.redirect("/");
    }

    // Find the user by the decoded ID
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    // Attach the user to the request object
    req.user = user;
    next();
  } catch (err) {
    console.log("Invalid token");
    return res.redirect("/");
  }
};
