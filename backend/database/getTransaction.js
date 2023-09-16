const connectDB = require("../config/database");
const handler = {};

handler.getTransaction = (req, res) => {
  const { user_id } = req.body;

  const sqlSelect = "SELECT * FROM transaction_history WHERE user_id=?";
  connectDB.query(sqlSelect, [user_id], (err, result) => {
    res.status(200).json(result);
  });
};

module.exports = handler;
