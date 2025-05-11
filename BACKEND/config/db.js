const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aksharvadher001:Z2s1jTZg4LIgFPpI@djcdb.nllua.mongodb.net/?retryWrites=true&w=majority&appName=djcdb"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
