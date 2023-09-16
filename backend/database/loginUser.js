const connectDB = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const handler = {};

handler.loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate if user exist in our database
    const sql = "SELECT * FROM users WHERE email=?";
    connectDB.query(sql, [email], async function (err, result) {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, matched) => {
          if (error) console.log(error);
          if (!matched)
            res
              .status(400)
              .send({ message: "Authentication failed, wrong password." });
          else {
            // Create token
            const token = jwt.sign(
              {
                user_id: result[0].user_id,
                username: result[0].username,
                email,
              },
              process.env.TOKEN_KEY,
              {
                expiresIn: "2h",
              }
            );

            const sql = "UPDATE users SET token=? WHERE email=?";
            connectDB.query(sql, [token, email], function (err, result) {
              if (err) throw err;
            });

            const user = { email, token };

            // user
            res.status(200).json(user);
          }
        });
      } else {
        res
          .status(400)
          .send({ message: "User not registered. Please Sign up." });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handler;
