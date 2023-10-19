const connectDB = require("../config/database");
const handler = {};

handler.buyCrypto = (req, res) => {
  const {
    user_id,
    crypto_id,
    name,
    symbol,
    image,
    buying_price,
    quantity,
    total_amount,
  } = req.body;
  const transaction_id = Math.random().toString(36).substring(2, 8);

  // Check if the holdings is in the DB already
  let sql = "SELECT * FROM holdings WHERE user_id=? AND symbol=?";
  connectDB.query(sql, [user_id, symbol], function (err, result) {
    if (err) res.status(400).send({ message: err.message });
    else if (result.length > 0) {
      // Update the holdings
      sql =
        "UPDATE holdings SET buying_price=?, quantity=quantity+?, total_amount=total_amount+? WHERE user_id=? AND symbol=?";
      connectDB.query(
        sql,
        [buying_price, quantity, total_amount, user_id, symbol],
        function (err, result) {
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
                "BUY",
                total_amount,
                quantity,
                `Bought ${symbol.toUpperCase()} at $${buying_price.toLocaleString()}`,
              ],
              function (err, result) {
                if (err) res.status(400).send({ message: err.message });
                // Update current balance
                sql =
                  "UPDATE users SET current_balance=current_balance-? WHERE user_id=?";
                connectDB.query(
                  sql,
                  [+total_amount, user_id],
                  function (err, result) {
                    if (err) res.status(400).send({ message: err.message });
                    res
                      .status(200)
                      .send({ message: `Added ${symbol} to holdings` });
                  }
                );
              }
            );
          }
        }
      );
    } else {
      // Add to holdings
      sql =
        "INSERT INTO holdings (user_id, crypto_id, name, symbol, image, buying_price, quantity, total_amount) VALUES (?,?,?,?,?,?,?,?)";
      connectDB.query(
        sql,
        [
          user_id,
          crypto_id,
          name,
          symbol,
          image,
          buying_price,
          quantity,
          total_amount,
        ],
        function (err, result) {
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
                "BUY",
                total_amount,
                quantity,
                `Bought ${symbol.toUpperCase()} at $${buying_price.toLocaleString()}`,
              ],
              function (err, result) {
                if (err) res.status(400).send({ message: err.message });
                // Update current balance
                sql =
                  "UPDATE users SET current_balance=current_balance-? WHERE user_id=?";
                connectDB.query(
                  sql,
                  [total_amount, user_id],
                  function (err, result) {
                    if (err) res.status(400).send({ message: err.message });
                    res
                      .status(200)
                      .send({ message: `Added ${symbol} to holdings` });
                  }
                );
              }
            );
          }
        }
      );
    }
  });
};

module.exports = handler;
