import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const promoteToSpecialist = (req, res) => {
  const token = req.cookies.accessToken;
  const q = "UPDATE users SET role_id = 2 WHERE email = ?";

  db.query(q, [req.params.email], (err, data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};

export const getSpecialists = (req, res) => {
  const token = req.cookies.accessToken;
  const q = "SELECT * FROM users WHERE role_id = 2";

  db.query(q, (err, data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
};

export const dismissSpecialist = (req, res) => {

  const q = "UPDATE users SET role_id = 3 WHERE id = ?";

  db.query(q, [req.params.id], (err, data)=>{
    if(err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}