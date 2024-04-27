const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;
