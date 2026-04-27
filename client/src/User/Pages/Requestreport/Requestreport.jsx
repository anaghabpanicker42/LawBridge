import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./requestreport.module.css";

const Requestreport = () => {
  const [reportFile, setReportFile] = useState(null);
  const [reportDetails, setReportDetails] = useState("");
  const [reports, setReports] = useState([]);


  const REQUEST_ID = 4;


  const fetchReports = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/RequestReport/");
      setReports(res.data.reports || []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ---------------- SAVE REPORT ----------------
  const handleSave = async () => {
    if (!reportFile || !reportDetails) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("request_id", REQUEST_ID);
    formData.append("requestreport_file", reportFile);
    formData.append("requestreport_details", reportDetails);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/RequestReport/",
        formData
      );

      alert(res.data.msg);

      setReportFile(null);
      setReportDetails("");
      fetchReports();
    } catch (error) {
      console.error("Save error:", error.response?.data || error);
      alert("Failed to save report");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Request Report</h2>

          <input
            type="file"
            className={Styles.input}
            onChange={(e) => setReportFile(e.target.files[0])}
          />

          <input
            type="text"
            className={Styles.input}
            placeholder="Report Details"
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Submit Report
          </button>
        </div>

        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Request Reports</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>File</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((rep, index) => (
                  <tr key={rep.id}>
                    <td>{index + 1}</td>
                    <td>
                      {rep.requestreport_file
                        ? rep.requestreport_file.split("/").pop()
                        : "No file"}
                    </td>
                    <td>{rep.requestreport_details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requestreport;
