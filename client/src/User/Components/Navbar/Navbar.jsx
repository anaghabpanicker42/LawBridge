import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Styles from "./navbar.module.css";

const UserNavbar = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("user_id");

  // 🔹 Improved subscription check
  const handleSearchLawyerClick = async () => {
    if (!userId) {
      alert("User not logged in");
      navigate("/login"); // optional: redirect if not logged in
      return;
    }

    try {
      // Call your subscription API (make sure it returns only user's subscriptions ideally)
      const res = await axios.get(`http://127.0.0.1:8000/Subscription/?user_id=${userId}`);

      // API should return something like { subscribed: true/false }
      if (res.data.subscribed) {
        navigate("/user/categorysearch");
      } else {
        alert("You need an active subscription to search lawyers.");
        navigate("/user/viewplan");
      }
    } catch (err) {
      console.error("Subscription check error:", err);
      alert("Error checking subscription. Try again.");
      navigate("/user/viewplan");
    }
  };

  return (
    <header className={Styles.navbar}>
      <div className={Styles.logoSection}>
        ⚖ <span>LAWBRIDGE</span>
      </div>

      <nav className={Styles.navLinks}>
        <button onClick={() => navigate("/user/dashboard")}>
          Home
        </button>

        <button onClick={handleSearchLawyerClick}>
          Find Lawyer
        </button>

        <button onClick={() => navigate("/user/myrequest")}>
          My Bookings
        </button>

        <button onClick={() => navigate("/user/complaint")}>
          Add Complaint
        </button>

        <button onClick={() => navigate("/user/rating")}>
          Add Rating
        </button>

        <button onClick={() => navigate("/user/viewplan")}>
          Subscription
        </button>
      </nav>

      <div
        className={Styles.profileSection}
        onClick={() => navigate("/user/myprofile")}
      >
        👤 Profile
      </div>
    </header>
  );
};

export default UserNavbar;