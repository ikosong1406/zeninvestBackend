const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../Schemas/UsersDetails");

const User = mongoose.model("UserInfo");

const JWT_SECRET = "qwerty123456";

router.post("/", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userEmail = decoded.email; // Assuming you encoded the email in the token payload

    User.findOne({ email: userEmail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error.message });
  }
});

module.exports = router;
