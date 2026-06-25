const express = require("express");
const bcrypt = require("bcrypt")
const { Pool } = require("pg");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { loginLimiter } = require("./dist/middleware/rateLimiter");
const { validate } = require("./dist/middleware/validate");
const { registerSchema, loginSchema } = require("./dist/validation/authschema");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const pool = new Pool({
  user: process.env.DB_USER,         
  host: process.env.DB_HOST,        
  database: process.env.DB_NAME,    
  password: process.env.DB_PASSWORD, 
  port: Number(process.env.DB_PORT), 
});

pool.connect()
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend Running");
});
app.post("/register", validate(registerSchema), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
const checkUser = await pool.query("SELECT * FROM users WHERE email=$1",[email] );
console.log("Rows:",checkUser.rows);
console.log("Length:",checkUser.rows.length);
if (checkUser.rows.length > 0) {
  return res.send("Email Already Exists");
}
  const hashedPassword = await bcrypt.hash(password, 10);

await pool.query(
  "INSERT INTO users(username,email,password) VALUES($1,$2,$3)",
  [username,email,hashedPassword]
); 

    res.send("User Registered Successfully");

  } catch (err) {
    console.log(err);
    res.send("Registration Failed");
  }
});
  app.post("/login",loginLimiter,validate(loginSchema) ,async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request:", req.body);

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );
console.log("Database Result:", result.rows);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "USER_NOT_FOUND" });
    }
const isMatch = await bcrypt.compare(
   password,
   result.rows[0].password
);

if(isMatch) {

   const token = jwt.sign(
    {
       email: email,
      role: result.rows[0].role
   } ,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
   );

   res.json({
      message: "Login Success",
      token,
       role: result.rows[0].role
   });
}
else {
   return res.status(401).json({ success: false, error: "INVALID_CREDENTIALS" });
}


  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: "SERVER_ERROR" });
  }
});
app.get("/profile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const result = await pool.query(
      "SELECT username,email FROM users WHERE email=$1",
      [decoded.email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.json({
      name: result.rows[0].username,
      email: result.rows[0].email,
      role: "User",
    });

  } catch (err) {
    console.log(err);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000");
});
