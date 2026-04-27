import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./userdashboard.module.css";

const UserDashboard = () => {

  const [lawyers, setLawyers] = useState([]);

  const userId = sessionStorage.getItem("user_id"); 

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/local-lawyers/${userId}/`)
      .then((response) => {
        setLawyers(response.data.lawyers);
      })
      .catch((error) => {
        console.log("Error fetching lawyers:", error);
      });
  }, [userId]);

  return (
    <div className={Styles.dashboard}>

      <div className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1>Find the Best Lawyer for Your Case</h1>
          <p>
            Connect with experienced lawyers in your area for any legal assistance.
          </p>
        </div>
      </div>

      <div className={Styles.section}>
        <h2>Top Lawyers Near You</h2>

        <div className={Styles.cardContainer}>
          {lawyers.length > 0 ? (
            lawyers.map((lawyer) => (
              <div className={Styles.card} key={lawyer.id}>
                <img
                  src={`http://127.0.0.1:8000${lawyer.photo}`}
                  alt="lawyer"
                />
                <h3>{lawyer.name}</h3>
                <p className={Styles.special}>{lawyer.qualification}</p>
                <p className={Styles.rating}>⭐ 4.8</p>
                

                
              </div>
            ))
          ) : (
            <p>No lawyers available in your district.</p>
          )}
        </div>
      </div>

      <div className={Styles.whySection}>
        <h2>Why Choose LawBridge</h2>

        <div className={Styles.whyContainer}>
          <div className={Styles.whyCard}>
            <h4>✔ Verified Lawyers</h4>
            <p>All listed lawyers are verified and experienced.</p>
          </div>

          <div className={Styles.whyCard}>
            <h4>🔒 Secure Payment</h4>
            <p>Safe and secure online payments.</p>
          </div>

          <div className={Styles.whyCard}>
            <h4>⏰ 24/7 Consultation</h4>
            <p>Get instant legal assistance anytime.</p>
          </div>
        </div>
      </div>

      <div className={Styles.footer}>
        <div>
          <h4>Quick Links</h4>
          <p>Home</p>
          <p>Find Lawyer</p>
          <p>My Bookings</p>
          <p>Profile</p>
        </div>

        <div>
          <h4>Support</h4>
          <p>FAQs</p>
          <p>Help Center</p>
          <p>Contact Us</p>
        </div>

        <div>
          <h4>Contact</h4>
          <p>📞 +91-87456-7890</p>
          <p>✉ info@lawbridge.com</p>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;