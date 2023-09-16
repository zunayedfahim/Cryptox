const connectDB = require("../config/database");
const handler = {};

handler.getUser = (req, res) => {
  const sqlSelect = "SELECT * FROM users WHERE email=?";
  connectDB.query(sqlSelect, [req.user.email], (err, result) => {
    res.status(200).send(result[0]);
  });
};

module.exports = handler;
