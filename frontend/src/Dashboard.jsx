import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };
  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Login Successful</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;





