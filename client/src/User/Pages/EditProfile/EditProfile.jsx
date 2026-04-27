import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./editprofile.module.css";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const USER_ID = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/UserGetById/${USER_ID}/`
      );
      setUser(res.data.user);
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/edituser/${USER_ID}/`,
        {
          user_name: user.user_name,
          user_email: user.user_email,
        }
      );

      alert(res.data.msg);
      fetchUser();
    } catch (err) {
      alert("Update Failed");
    }
  };

  if (loading) return <p className={Styles.loading}>Loading...</p>;
  if (!user) return <p className={Styles.loading}>No user data found</p>;

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Edit Profile</h2>
        <p className={Styles.subtitle}>Update your personal details</p>

        <div className={Styles.field}>
          <label>Name</label>
          <input
            type="text"
            name="user_name"
            value={user.user_name}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            value={user.user_email}
            onChange={handleChange}
          />
        </div>

        <div className={Styles.field}>
          <label>Place</label>
          <input
            type="text"
            value={user.place_id__place_name}
            disabled
          />
        </div>

        <button className={Styles.button} onClick={handleUpdate}>
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
