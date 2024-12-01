const axios = require("axios");
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
};

const PORT = 8080;
const app = express();

app.use(express.json());

app.use(cors(corsOptions));
const db = mysql.createConnection({
    host: "localhost",
    user: 'unimind_12sd',
    password: "unimind_12sd",
    database: "unimind_12sd"
})

app.post('login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ? AND pwd = ?"; 
    // const values = [
    //     req.body.email,
    //     req.body.pwd
    // ]
    db.query(sql, [req.body.email, req.body.pwd], (err, data) => {
        if(err) return res.json("Login Failed");
        return res.json(data);
    })
});
// app.post('register', (req, res) => {
//     const sql = "INSERT INTO users (email, pwd)"; 
//     const values = [
//         req.body.email,
//         req.body.pwd
//     ]
//     db.query(sql, [req.body.email, req.body.pwd], (err, data) => {
//         if(err) return res.json("Registration Failed");
//         return res.json(data);
//     })
// });

app.use((req, res) => {
    res.status(404);
    res.send('<h1>Error 404: Resource not found</h1>')
});

app.listen(PORT, () => {
    console.log(`running the app server and listenong on Port  ${PORT}`);
});

