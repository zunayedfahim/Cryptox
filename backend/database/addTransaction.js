const connectDB = require("../config/database");
const handler = {};

handler.addTransaction = (req, res) => {
  const { user_id, transaction_type, transaction_amount, description } =
    req.body;
  const transaction_id = Math.random().toString(36).substring(2, 8);

  const sql =
    "INSERT INTO transaction_history (transaction_id, user_id, transaction_type, transaction_amount, description) VALUES (?,?,?,?,?)";
  connectDB.query(
    sql,
    [
      transaction_id.toUpperCase(),
      user_id,
      transaction_type,
      transaction_amount,
      description,
    ],
    function (err, result) {
      if (err) res.status(400).send({ message: err.message });
      res.status(200).send({ message: "New transaction added" });
    }
  );
};

module.exports = handler;
