import React, { useState, useEffect } from "react";
import Styles from "./complaint.module.css";
import axios from "axios";

const Complaint = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = sessionStorage.getItem("user_id"); 
  if (!userId) {
    alert("User not logged in");
    return null;
  }

  // Fetch all complaints of the current user
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/Complaint/");
      const userComplaints = response.data.complaints.filter(
        (c) => String(c.user_id) === String(userId)
      );
      setComplaints(userComplaints);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run fetch on component mount
  React.useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSave = async () => {
    if (!title || !content) return alert("Please fill all fields");

    try {
      await axios.post("http://127.0.0.1:8000/Complaint/", {
        complaint_title: title,
        complaint_content: content,
        user_id: userId,
      });

      alert("Complaint submitted successfully!");
      setTitle("");
      setContent("");
      fetchComplaints(); // Refresh complaints to show new entry
    } catch (err) {
      console.error(err);
      alert("Error submitting complaint");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Register Complaint</h2>

          <input
            type="text"
            placeholder="Complaint Title"
            className={Styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Complaint Content"
            className={Styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Add Complaint
          </button>
        </div>

        <h2 className={Styles.title} style={{ marginTop: "40px" }}>
          Your Complaints
        </h2>

        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints submitted yet.</p>
        ) : (
          <div className={Styles.complaintList}>
            {complaints.map((c) => (
              <div key={c.id} className={Styles.card}>
                <h3 className={Styles.complaintTitle}>{c.complaint_title}</h3>
                <p className={Styles.complaintContent}>{c.complaint_content}</p>
                <p>
                  Status:{" "}
                  {c.complaint_status === "1" ? "Replied" : "Pending"}
                </p>
                {c.complaint_status === "1" && c.complaint_reply && (
                  <p className={Styles.adminReply}>
                    <strong>Admin Reply:</strong> {c.complaint_reply}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaint;