import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/authSlice";
import "./Admin.css";

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="admin-page">
      <h1>🔐 Admin Dashboard</h1>
      <h2>Admin Controls</h2>
      <div className="admin-controls">
        <button>View Users</button>
        <button>Manage Users</button>
        <button>Delete Users</button>
      </div>

      <button className="admin-logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Admin;