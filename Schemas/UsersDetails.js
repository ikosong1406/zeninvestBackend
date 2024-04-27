const mongoose = require("mongoose");
const Transaction = require("./TransactionDetails");
const Portfolio = require("./Portfolio");
const { v4: uuidv4 } = require("uuid");

const UserDetailsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true },
    password: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      unique: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    totalInvested: {
      type: Number,
      default: 0,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    profilePicture: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    portfolio: [Portfolio.schema],
    transactions: [Transaction.schema],
    lastProfitUpdate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "UserInfo",
  }
);

// Middleware to generate a unique account number before saving the user
UserDetailsSchema.pre("save", function (next) {
  if (!this.accountNumber) {
    this.accountNumber = generateAccountNumber();
  }
  next();
});

// Function to generate a random 10-digit number
function generateAccountNumber() {
  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNumber.toString(); // Convert to string to ensure leading zeros are preserved if needed
}

mongoose.model("UserInfo", UserDetailsSchema);
