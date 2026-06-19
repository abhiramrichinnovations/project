import { useNavigate } from "react-router-dom";
import { useState } from "react";
function App() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const handleRegister = async () => {
  if (!name || !email || !password) {
          setError("Please fill all fields");
        return;
    }

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
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
      <h1>Sign Up</h1>

      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
      <br /><br />

      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
      <br /><br />

      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      <br /><br />
      {error && <p className="error">{error}</p>}

      <button onClick= {handleRegister}>Register</button>
    </div>
    </div>
  );
}

export default App;

