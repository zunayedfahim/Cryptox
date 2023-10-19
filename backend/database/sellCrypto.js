const connectDB = require("../config/database");
const handler = {};

handler.sellCrypto = (req, res) => {
  const { user_id, symbol, selling_price, quantity, total_amount } = req.body;
  const transaction_id = Math.random().toString(36).substring(2, 8);

  // Delete from the holdings
  sql = "DELETE FROM holdings WHERE user_id=? AND symbol=?";
  connectDB.query(sql, [user_id, symbol], function (err, result) {
    if (err) res.status(400).send({ message: err.message });
    else {
      //   Add to Transaction Table
      sql =
        "INSERT INTO transaction_history (transaction_id, user_id, transaction_type, transaction_amount, quantity, description) VALUES (?,?,?,?,?,?)";
      connectDB.query(
        sql,
        [
          transaction_id.toUpperCase(),
          user_id,
          "SELL",
          total_amount,
          quantity,
          `Sold ${symbol.toUpperCase()} at $${selling_price.toLocaleString()}`,
        ],
        function (err, result) {
          if (err) res.status(400).send({ message: err.message });
          // Update current balance
          sql =
            "UPDATE users SET current_balance=current_balance+? WHERE user_id=?";
          connectDB.query(sql, [total_amount, user_id], function (err, result) {
            if (err) res.status(400).send({ message: err.message });
            res.status(200).send({ message: `Sold ${symbol}` });
          });
        }
      );
    }
  });
};
module.exports = handler;
