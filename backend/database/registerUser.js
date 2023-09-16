const connectDB = require("../config/database");
const bcrypt = require("bcryptjs");

const handler = {};

handler.registerUser = async (req, res) => {
  try {
    // Get user input
    const { username, email, password } = req.body;

    // check if user already exist
    const sql = "SELECT * FROM users WHERE email=?";
    connectDB.query(sql, [email], async function (err, result) {
      if (result.length > 0) {
        return res
          .status(409)
          .send({ message: "User Already Exist. Please Login" });
      } else {
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const sql2 =
          "INSERT INTO users (username, email, password) VALUES (?,?,?)";
        connectDB.query(
          sql2,
          [username, email, encryptedPassword],
          function (err, result) {
            if (err) throw err;
            console.log("New user registered.");
          }
        );

        const user = { username, email };
        // return new user
        res.status(201).json(user);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = handler;
