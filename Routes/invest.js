const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Portfolio = require("../Schemas/Portfolio");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

router.post("/", async (req, res) => {
  try {
    const {
      userId,
      companyName,
      amount,
      interest,
      subscription,
      companyImage,
    } = req.body;

    // Assuming you have a user object attached to the request from authentication middleware
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const investmentAmount = parseInt(amount);

    // Update user's balance and totalInvested immediately
    user.balance -= investmentAmount;
    user.totalInvested += investmentAmount;
    await user.save();

    // Update user's portfolio with the new investment
    const newInvestment = new Portfolio({
      companyName,
      amount,
      interest,
      subscription,
      companyImage,
    });

    user.portfolio.push(newInvestment);
    await user.save();

    res.status(200).json({ message: "Investment successful", status: "ok" });
  } catch (error) {
    console.error("Error in investment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
