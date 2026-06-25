import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import { useNavigate, Link} from "react-router-dom";
import api from "./api";
import "./Dashboard.css";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/profile")
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return <h2>Loading Profile...</h2>;
  }

  return (
  <div className="dashboard">
  <aside className="sidebar">
    <h2>SafeAccess</h2>

    <ul>
     <li>
  <Link to="/dashboard">🏠 Dashboard</Link>
</li>

<li>
  <Link to="/profile">👤 Profile</Link>
</li>

    </ul>

    <button className="sidebar-logout" onClick={handleLogout}>
      Logout
    </button>
  </aside>

  <main className="main-content">
    <div className="header">
      <h1>Welcome Back, {} 👋</h1>
    </div>
 </main>
</div>
  )
};


export default Dashboard;
//import { useEffect, useState } from "react";
//import api from "./api";
//import "./Dashboard.css";

//function Dashboard() {
//  const [profile, setProfile] = useState(null);

 // useEffect(() => {
   // api.get("/profile")
    //  .then((res) => {
     //   setProfile(res.data);
   //   });
 // }, []);

 // return (
   // <div>
    //  <h1>Dashboard</h1>

    //  {profile && (
       // <>
         // <h2>{profile.name}</h2>
        //  <p>{profile.role}</p>
      //  </>
    //  )}
   // </div>
  //);
//}

//export default Dashboard;
//import { useEffect } from "react";
//import { useNavigate } from "react-router-dom";

//function Dashboard() {
  // const navigate = useNavigate();

 // useEffect(() => {
   // const token = localStorage.getItem("token");

///    if (!token) {
   //   navigate("/");
   // }
 // }, []);
 // const handleLogout = () => {
   // localStorage.removeItem("token");
   // navigate("/");
 // };
 // return (
  //  <div>
   //   <h1>Welcome to Dashboard</h1>
     // <p>Login Successful</p>
     // <button onClick={handleLogout}>Logout</button>
   // </div>
 // );
//}

//export default Dashboard;





