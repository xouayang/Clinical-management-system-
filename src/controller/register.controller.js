const db = require("../config/db.config");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs')
const bcrypt = require("bcryptjs");
exports.singUp = async (req, res) => {
  const user_id = uuid.v4();
  try {
    console.log(req.path);
    const { username, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPw = await bcrypt.hashSync(password, salt);
    await db.query(
      `
          INSERT INTO tb_users(user_id,username,email,password,role) VALUES($1,$2,$3,$4,$5) RETURNING *
         `,
      [user_id, username, email, hashPw, role],
      (error, result) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(201).json({ message: "Inserted Success" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ messaeg: error.messaeg });
    //   console.log(error)
  }
};

// login
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await db.query(`SELECT * FROM tb_users WHERE email = ${email};`);
    const user = data.rows;
    if (user.length === 0) {
      return res.status(400).json({ message: "NOT FOUND USER" });
    } else {
      await bcrypt.compare(password, user[0].password, (error, result) => {
        if (error) {
          console.log(error);
        } else if (result == true) {
          const token = jwt.sign({ email: email, password: password },'CLINIC',{expiresIn:"24h"});
           return res.status(200).json({
            message:"user is logined",
            token:token
           })
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
