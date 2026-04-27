import React, { useState, useEffect, useRef } from "react";
import Styles from "./userregister.module.css";
import axios from "axios";

const UserRegister = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [proof, setProof] = useState(null);
  const [districtId, setDistrictId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const photoRef = useRef();
  const proofRef = useRef();

  // Fetch districts and places
  useEffect(() => {
    const fetchDistrictsAndPlaces = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/place/");
        setDistricts(res.data.districtdata || []);
        setPlaces(res.data.placedata || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDistrictsAndPlaces();
  }, []);

  // Filter places when district changes
  useEffect(() => {
    if (!districtId) {
      setFilteredPlaces([]);
      setPlaceId("");
    } else {
      const filtered = places.filter((p) => p.district_id === parseInt(districtId));
      setFilteredPlaces(filtered);
      setPlaceId("");
    }
  }, [districtId, places]);

  // Handle Save
  const handleSave = async () => {
    const namePattern = /^[A-Za-z ]{2,50}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!userName.trim() || !email.trim() || !password.trim() || !districtId || !placeId || !photo || !proof) {
      alert("Please fill all required fields and upload both Photo and Proof");
      return;
    }

    if (!namePattern.test(userName)) {
      alert("Name must be 2-50 characters, letters and spaces only");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (!passwordPattern.test(password)) {
      alert("Password must be at least 6 characters and include letters and numbers");
      return;
    }

    const formData = new FormData();
    formData.append("user_name", userName);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("place_id", placeId);
    formData.append("user_photo", photo);
    formData.append("user_proof", proof);

    try {
      await axios.post("http://127.0.0.1:8000/User/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setUserName("");
      setEmail("");
      setPassword("");
      setDistrictId("");
      setPlaceId("");
      setPhoto(null);
      setProof(null);
      if (photoRef.current) photoRef.current.value = "";
      if (proofRef.current) proofRef.current.value = "";

      alert("User added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding user!");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>User Registration</h2>

          <input
            type="text"
            placeholder="Name"
            className={Styles.input}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className={Styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className={Styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className={Styles.fileLabel}>Add Photo</label>
          <input
            type="file"
            accept="image/*"
            className={Styles.input}
            onChange={(e) => setPhoto(e.target.files[0])}
            ref={photoRef}
          />

          <label className={Styles.fileLabel}>Add Proof</label>
          <input
            type="file"
            accept="image/*,application/pdf"
            className={Styles.input}
            onChange={(e) => setProof(e.target.files[0])}
            ref={proofRef}
          />

          <select
            className={Styles.input}
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.district_name}
              </option>
            ))}
          </select>

          <select
            className={Styles.input}
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            disabled={!districtId}
          >
            <option value="">Select Place</option>
            {filteredPlaces.map((p) => (
              <option key={p.id} value={p.id}>
                {p.place_name}
              </option>
            ))}
          </select>

          <button className={Styles.button} onClick={handleSave}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;