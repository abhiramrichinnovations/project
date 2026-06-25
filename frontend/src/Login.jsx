import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./store/authSlice";
import "./Login.css"
function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector(
  (state) => state.auth
);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async () => {
 console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

  const result = await dispatch(
    loginUser({
      email,
      password,
    })
  );
console.log("RESULT:", result);
  if (result.payload?.role === "admin") {
    navigate("/admin");
  }
  else if (result.payload?.token)
  {
    navigate("/dashboard");
  }
  console.log("Current Email:", email);
console.log("Current Password:", password);

};
  return (
<div className="login-page">
  <div className="border-animation">
    <div className="login-container">


      <h1>Welcome Back</h1>
      <p>Login to your account</p>

      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      
      {error && <p className="error">{error}</p>}
      <br /><br />

    <button onClick={handleLogin}
     disabled={loading}>
      {loading ? "Loading..." : "Login"}
     </button>

<div className="register-section">
  <p>Don't have an account?</p>

  <Link className="create-account" to="/register">
    Sign Up
  </Link>
</div>
    </div>
    </div>
    </div>
  );
}

export default Login;




