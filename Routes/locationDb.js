const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    const user = await User.findOne({ userId }); // Assuming username is unique
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.location.coordinates = [latitude, longitude];
    await user.save();
    res.status(201).json({ message: "Location saved to user", status: "ok" });
  } catch (error) {
    console.error("Error saving location to user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
