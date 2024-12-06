import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateProfile = (req, res) => {
  
  const q_before = "SELECT * FROM users WHERE anonymous_name = ? OR email = ?";
  db.query(q_before, [req.body.inputs.anonymous_name, req.body.inputs.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("Email or username already taken");

    const q =
      "UPDATE users SET `anonymous_name`=?,`email`=?,`password`=? WHERE id=? ";

      
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.inputs.password, salt);

    db.query(
      q,
      [
        req.body.inputs.anonymous_name,
        req.body.inputs.email,
        hashedPassword,
        req.body.inputs.userId,
      ],
      (err, data) => {
        if (err) res.status(500).json(err.message);
        if (data.affectedRows > 0) return res.status(200).json("Updated!");
      }
    );
  });
};
