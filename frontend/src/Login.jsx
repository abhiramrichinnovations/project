import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  useEffect(() => {
    fetch("http://localhost:5000")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
  }, []);

    const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const handleLogin = async () => {
  if (!email || !password) {
        setError("Please enter email and password");
        return;
    }
  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.text();
  if (data === "Login Success") {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
} else {
    setError(data); }
};
  return (
<div className="login-page">
    <div className="login-container">


      <h1>Login</h1>

      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      {error && <p className="error">{error}</p>}
      <br /><br />

      <button onClick={handleLogin}>Login</button>
      <br /><br />
      <Link to="/register">Create Account</Link>
    </div>
    </div>
  );
}

export default Login;




