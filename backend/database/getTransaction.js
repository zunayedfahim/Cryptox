const connectDB = require("../config/database");
const handler = {};

handler.getTransaction = (req, res) => {
  const { user_id } = req.body;

  const sqlSelect =
    "SELECT * FROM transaction_history WHERE user_id=? ORDER BY date_and_time DESC";
  connectDB.query(sqlSelect, [user_id], (err, result) => {
    if (err) res.status(400).send({ message: err.message });
    res.status(200).json(result);
  });
};

module.exports = handler;
