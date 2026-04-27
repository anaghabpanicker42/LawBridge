import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./request.module.css";
import { useParams } from "react-router";

const Request = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [modeStatus, setModeStatus] = useState("");

  const USER_ID = sessionStorage.getItem("user_id");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Request/");
      setRequests(res.data.requests || []);
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  const handleSave = async () => {
    if (!file) {
      alert("File should be added");
      return;
    }

    if (!modeStatus) {
      alert("Please select mode (Online/Offline)");
      return;
    }

    const formData = new FormData();
    formData.append("request_file", file);
    formData.append("user_id", USER_ID);
    formData.append("lawyer_id", id);
    formData.append("request_status", 0);
    formData.append("mode_status", modeStatus);
    formData.append(
      "request_date",
      new Date().toISOString().split("T")[0]
    );
    formData.append("request_type", "File Request");
    formData.append("request_fee", 0);

    try {
      await axios.post("http://127.0.0.1:8000/Request/", formData);
      alert("Request added successfully");
      setFile(null);
      setModeStatus("");
      fetchRequests();
    } catch (err) {
      console.log("Error adding request:", err.response?.data);
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Submit Legal Request</h2>


          <div className={Styles.uploadBox}>
            <label className={Styles.label}>Upload Your Document</label>
            <input
              type="file"
              className={Styles.input}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

     \
          <div className={Styles.modeContainer}>
            <label
              className={`${Styles.modeOption} ${
                modeStatus === "1" ? Styles.selectedMode : ""
              }`}
            >
              <input
                type="radio"
                name="mode"
                value="1"
                checked={modeStatus === "1"}
                onChange={(e) => setModeStatus(e.target.value)}
              />
              Online Consultation
            </label>

            <label
              className={`${Styles.modeOption} ${
                modeStatus === "2" ? Styles.selectedMode : ""
              }`}
            >
              <input
                type="radio"
                name="mode"
                value="2"
                checked={modeStatus === "2"}
                onChange={(e) => setModeStatus(e.target.value)}
              />
              Office Visit
            </label>
          </div>

          <button className={Styles.button} onClick={handleSave}>
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request;