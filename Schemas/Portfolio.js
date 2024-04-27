const mongoose = require("mongoose");

const portfolio = new mongoose.Schema({
  companyName: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  interest: {
    type: Number,
  },
  subscription: {
    type: String,
  },
  companyImage: {
    type: String,
  },
  profit: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Portfolio", portfolio);
