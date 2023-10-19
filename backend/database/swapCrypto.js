const connectDB = require("../config/database");
const handler = {};

handler.swapCrypto = (req, res) => {
  const {
    user_id,
    fromSymbol,
    toCrypto_id,
    name,
    toSymbol,
    image,
    buying_price,
    quantity,
    total_amount,
  } = req.body;
  const transaction_id = Math.random().toString(36).substring(2, 8);

  // DELETE the holdings
  sql = "DELETE FROM holdings WHERE user_id=? AND symbol=?";
  connectDB.query(sql, [user_id, fromSymbol], function (err, r) {
    if (err) res.status(400).send({ message: err.message });
    else {
      // Check and add to holdings
      sql = "SELECT * FROM holdings WHERE user_id=? AND symbol=?";
      connectDB.query(sql, [user_id, toSymbol], function (err, result) {
        if (err) res.status(400).send({ message: err.message });
        else if (result.length > 0) {
          // Update the holdings
          sql =
            "UPDATE holdings SET buying_price=?, quantity=quantity+?, total_amount=total_amount+? WHERE user_id=? AND symbol=?";
          connectDB.query(
            sql,
            [buying_price, quantity, total_amount, user_id, toSymbol],
            function (err, result2) {
              if (err) res.status(400).send({ message: err.message });
              //   Add to Transaction Table
              sql =
                "INSERT INTO transaction_history (transaction_id, user_id, transaction_type, transaction_amount, quantity, description) VALUES (?,?,?,?,?,?)";
              connectDB.query(
                sql,
                [
                  transaction_id.toUpperCase(),
                  user_id,
                  "SWAP",
                  total_amount,
                  quantity,
                  `Swapped ${fromSymbol.toUpperCase()} to ${toSymbol.toUpperCase()}`,
                ],
                function (err, result3) {
                  if (err) res.status(400).send({ message: err.message });
                  res.status(200).send({ message: "Crypto Swapped." });
                }
              );
            }
          );
        } else {
          // Set new holdings
          sql =
            "INSERT INTO holdings (user_id, crypto_id, name, symbol, image, buying_price, quantity, total_amount) VALUES (?,?,?,?,?,?,?,?)";
          connectDB.query(
            sql,
            [
              user_id,
              toCrypto_id,
              name,
              toSymbol,
              image,
              buying_price,
              quantity,
              total_amount,
            ],
            function (err, r) {
              if (err) res.status(400).send({ message: err.message });
              //   Add to Transaction Table
              sql =
                "INSERT INTO transaction_history (transaction_id, user_id, transaction_type, transaction_amount, quantity, description) VALUES (?,?,?,?,?,?)";
              connectDB.query(
                sql,
                [
                  transaction_id.toUpperCase(),
                  user_id,
                  "SWAP",
                  total_amount,
                  quantity,
                  `Swapped ${fromSymbol.toUpperCase()} to ${toSymbol.toUpperCase()}`,
                ],
                function (err, result3) {
                  if (err) res.status(400).send({ message: err.message });
                  res.status(200).send({ message: "Crypto Swapped." });
                }
              );
            }
          );
        }
      });
    }
  });
};

module.exports = handler;
