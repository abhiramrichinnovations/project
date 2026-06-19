const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "loginapp",
  password: "kali@123",
  port: 5432,
});

pool.connect()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
const checkUser = await pool.query("SELECT * FROM users WHERE email=$1",[email] );
console.log("Rows:",checkUser.rows);
console.log("Length:",checkUser.rows.length);
if (checkUser.rows.length > 0) {
  return res.send("Email Already Exists");
}
    await pool.query(
      "INSERT INTO users(name,email,password) VALUES($1,$2,$3)",
      [name, email, password]
    );

    res.send("User Registered Successfully");

  } catch (err) {
    console.log(err);
    res.send("Registration Failed");
  }
});
  app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.send("User Not Found");
    }

    if (result.rows[0].password === password) {
      res.send("Login Success");
    } else {
      res.send("Wrong Password");
    }

  } catch (err) {
    console.log(err);
    res.send("Login Failed");
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
