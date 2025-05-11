const express = require("express");

const {
  getGemstoneList,
  getGemstoneListId,
  addGemstone,
} = require("../controllers/gemstone.controller");

const router = express.Router();

router.get("/", getGemstoneList);

router.get("/:id", getGemstoneListId);

router.post("/", addGemstone);

module.exports = router;
