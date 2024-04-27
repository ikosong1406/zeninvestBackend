const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const register = require("./Routes/register");
const login = require("./Routes/login");
const userdata = require("./Routes/userdata");
const allUsers = require("./Routes/allUsers");
const allTransaction = require("./Routes/allTransaction");
const adminLogin = require("./Routes/adminLogin");
const adminRegister = require("./Routes/adminRegister");
const adminDeposit = require("./Routes/adminDeposit");
const adminWithdrawal = require("./Routes/adminWithdrawal");
const confirmTransaction = require("./Routes/confirmTransaction");
const transaction = require("./Routes/transaction");
const invest = require("./Routes/invest");
const locationDb = require("./Routes/locationDb");
const updateProfile = require("./Routes/updateProfile");

const PORT = process.env.PORT || 5001;

const mongoUrl =
  "mongodb+srv://alexandervirtuous14:ZenInvest@cluster0.kebhkyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

require("./Schemas/UsersDetails");
require("./Utils/cronJobs");
const User = mongoose.model("UserInfo");

app.use("/register", register);
app.use("/login", login);
app.use("/userdata", userdata);
app.use("/allUsers", allUsers);
app.use("/allTransaction", allTransaction);
app.use("/adminLogin", adminLogin);
app.use("/adminRegister", adminRegister);
app.use("/adminDeposit", adminDeposit);
app.use("/adminWithdrawal", adminWithdrawal);
app.use("/confirmTransaction", confirmTransaction);
app.use("/transaction", transaction);
app.use("/invest", invest);
app.use("/invest", invest);
app.use("/locationDb", locationDb);
app.use("/updateProfile", updateProfile);

app.listen(PORT, () => {
  console.log("Server Started");
});
