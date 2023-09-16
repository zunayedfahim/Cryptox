require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");

const { getCryptos } = require("./database/getCryptos");
const { registerUser } = require("./database/registerUser");
const { loginUser } = require("./database/loginUser");
const auth = require("./middleware/auth");
const { getUser } = require("./database/getUser");
const { addTransaction } = require("./database/addTransaction");
const { getTransaction } = require("./database/getTransaction");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Get Cryptos
app.get("/api/getCryptos", getCryptos);

// Register
app.post("/register", registerUser);

// Login
app.post("/login", loginUser);

// Add Transaction
app.post("/addTransaction", addTransaction);

// Get Transaction
app.post("/getTransaction", getTransaction);

app.post("/auth", auth, getUser);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
