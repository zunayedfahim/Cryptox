const connectDB = require("../config/database");
const handler = {};

handler.getCryptos = (req, res) => {
  const sqlSelect = "SELECT * FROM cryptocurrencies";
  connectDB.query(sqlSelect, (err, result) => {
    res.status(200).json(result);
  });
};

module.exports = handler;
