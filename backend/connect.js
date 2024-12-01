import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: 'unimind_12sd',
  password: "unimind_12sd",
  database: "unimind_12sd"
})