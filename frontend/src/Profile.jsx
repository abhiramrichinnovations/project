import { useEffect, useState } from "react";
import api from "./api";
import "./Profile.css";
function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/profile")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

return (
  <div className="profile-container">
    <div className="user-card">

      <div className="user-header">
        <div className="avatar">
          {profile?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="user-details">
          <h2>{profile?.name}</h2>
          <p>{profile?.email}</p>

          <div className="badges">
            <span className="active-badge">🟢 Active</span>
            <span className="role-badge">{profile?.role}</span>
          </div>
        </div>
      </div>

      <hr />

      <h3 className="section-title">
        🛡 Account & Security
      </h3>

      <div className="feature-box">
        <span>🔐 JWT Authentication</span>
        <span>✅</span>
      </div>

      <div className="feature-box">
        <span>⚡ Axios Interceptor Enabled</span>
        <span>✅</span>
      </div>

      <div className="feature-box">
        <span>🛡 Protected Route Active</span>
        <span>✅</span>
      </div>

      <div className="feature-box">
        <span>📦 Redux State Management</span>
        <span>✅</span>
      </div>

      

    </div>
  </div>
);
}

export default Profile;