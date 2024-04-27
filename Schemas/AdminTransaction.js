// AdminTransaction schema
const mongoose = require("mongoose");

const AdminTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  walletAddress: {
    type: String,
  },
  coin: {
    type: String,
  },
  type: {
    type: String,
    enum: ["Deposit", "Withdrawal"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed"],
    default: "Pending",
  },
});

const AdminTransaction = mongoose.model(
  "AdminTransaction",
  AdminTransactionSchema
);

module.exports = AdminTransaction;
