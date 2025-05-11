const Gemstone = require("../models/gemstone.model");

const getGemstoneList = async (req, res) => {
  try {
    const gemstoneList = await Gemstone.find();
    res.status(201).json(gemstoneList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGemstoneListId = async (req, res) => {
  try {
    const id = req.params.id;
    const gemstone = await Gemstone.findById(id);
    res.status(200).json(gemstone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addGemstone= async (req, res) => {
  try {
    const createdgemstone = await Gemstone.create(req.body);
    res.status(201).json(createdgemstone);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
     getGemstoneList,
     getGemstoneListId,
     addGemstone,
};
