import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
function App() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const handleRegister = async () => {
  if (!username || !email || !password) {
          setError("Please fill all fields");
        return;
    }

  try {
    console.log(username, email, password);
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await res.text();
    if (data === "User Registered Successfully")
    {
      setTimeout(() => {
      navigate("/");
    }, 2000);
  }
    else {
    setError(data);
  }
 } catch (err) {
  console.log(err);
  alert("fetch error");
}
};

  return (
    <div className="login-page">
      <div className="login-container">
  

      <h1>Create Account</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
<input
  type="text"
  placeholder="Name"
  onChange={(e) => setUserName(e.target.value)}
/>

<br /><br />

<input
  type="email"
  placeholder="Email"
  onChange={(e) => setEmail(e.target.value)}
/>

<br /><br />

<input
  type="password"
  placeholder="Password"
  onChange={(e) => setPassword(e.target.value)}
/>

<br /><br />

<button onClick={handleRegister}>Register</button>

<div className="login-section">
  <p>Already have an account?</p>
  <Link to="/">Login</Link>
</div>
    </div>
    </div>
  );
}

export default App;

