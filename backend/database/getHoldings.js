const connectDB = require("../config/database");
const handler = {};

handler.getHoldings = (req, res) => {
  const { user_id } = req.body;

  const sqlSelect = "SELECT * FROM holdings WHERE user_id=?";
  connectDB.query(sqlSelect, [user_id], (err, result) => {
    if (err) res.status(400).send({ message: err.message });
    res.status(200).send(result);
  });
};

module.exports = handler;
