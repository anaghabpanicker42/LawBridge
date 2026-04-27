import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./myprofile.module.css";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const USER_ID = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    if (!USER_ID) {
      setError("User ID not found in session.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`http://127.0.0.1:8000/UserGetById/${USER_ID}/`);
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setError(res.data.error || "No user data found");
      }
    } catch (err) {
      console.error("Profile fetch error", err);
      setError("Failed to fetch profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className={Styles.loading}>Loading profile...</p>;
  if (error) return <p className={Styles.loading}>{error}</p>;

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>My Profile</h2>
        <p className={Styles.subtitle}>Your account information</p>

        <div className={Styles.avatar}>
          <img
            src={
              user.user_photo
                ? `http://127.0.0.1:8000/${user.user_photo}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="User Avatar"
          />
        </div>

        <div className={Styles.info}>
          <div className={Styles.row}>
            <span>Name</span>
            <span>{user.user_name || "-"}</span>
          </div>

          <div className={Styles.row}>
            <span>Email</span>
            <span>{user.user_email || "-"}</span>
          </div>

          <div className={Styles.row}>
            <span>Place</span>
            <span>{user.place_id__place_name || "-"}</span>
          </div>
        </div>

        <div className={Styles.actions}>
          <a href="/user/editprofile">Edit Profile</a>
          <a href="/user/changepassword">Change Password</a>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;