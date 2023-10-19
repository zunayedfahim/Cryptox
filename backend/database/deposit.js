const connectDB = require("../config/database");
const handler = {};

handler.deposit = (req, res) => {
  const { user_id, amount, method } = req.body;
  const transaction_id = Math.random().toString(36).substring(2, 8);

  //   Add to Transaction Table
  let sql =
    "INSERT INTO transaction_history (transaction_id, user_id, transaction_type, transaction_amount, description) VALUES (?,?,?,?,?)";
  connectDB.query(
    sql,
    [
      transaction_id.toUpperCase(),
      user_id,
      "IN",
      amount,
      `Deposited $${amount} via ${method}`,
    ],
    function (err, result) {
      if (err) res.status(400).send({ message: err.message });
      // Update current balance
      sql =
        "UPDATE users SET current_balance=current_balance+? WHERE user_id=?";
      connectDB.query(sql, [amount, user_id], function (err, result) {
        if (err) res.status(400).send({ message: err.message });
        res.status(200).send({ message: "Money Deposited" });
      });
    }
  );
};

module.exports = handler;
