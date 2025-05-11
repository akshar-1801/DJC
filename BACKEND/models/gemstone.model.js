const mongoose = require("mongoose");

const GemstoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    gemstoneCategory: {
      type: String,
      required: true,
      enum: ["Diamond", "Sapphire", "Ruby", "Emerald"],
    },
    carat: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    clarity: {
      type: String,
      enum: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"],
    },
    cut: {
      type: String,
      required: true,
      enum: [
        "Round",
        "Princess",
        "Oval",
        "Emerald",
        "Asscher",
        "Marquise",
        "Radiant",
        "Pear",
        "Cushion",
      ],
    },
  },
  { timestamps: true }
);

const Gemstone = mongoose.model("Gemstone", GemstoneSchema);

module.exports = Gemstone;
