require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./database/database");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM cryptocurrencies";
  connectDB.query(sqlSelect, (err, result) => {
    res.json(result);
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
