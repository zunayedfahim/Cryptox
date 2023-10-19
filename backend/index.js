require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

const { registerUser } = require("./database/registerUser");
const { loginUser } = require("./database/loginUser");
const auth = require("./middleware/auth");
const { getUser } = require("./database/getUser");
const { getTransaction } = require("./database/getTransaction");
const { buyCrypto } = require("./database/buyCrypto");
const { sellCrypto } = require("./database/sellCrypto");
const { swapCrypto } = require("./database/swapCrypto");
const { getHoldings } = require("./database/getHoldings");
const { deposit } = require("./database/deposit");
const { withdraw } = require("./database/withdraw");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Register
app.post("/register", registerUser);

// Login
app.post("/login", loginUser);

// Get Transaction
app.post("/getTransaction", getTransaction);

// Get Transaction
app.post("/getHoldings", getHoldings);

// Buy Crypto
app.post("/buyCrypto", buyCrypto);

// Sell Crypto
app.post("/sellCrypto", sellCrypto);

// Swap Crypto
app.post("/swapCrypto", swapCrypto);

// Add Balanace
app.post("/deposit", deposit);

// Withdraw Balance
app.post("/withdraw", withdraw);

// Verify User
app.post("/auth", auth, getUser);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
