import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import Styles from "./viewreport.module.css";

const ViewReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/getrequestfee/${id}/`)
      .then((res) => {
        const feeData = res.data.fees || [];

        const paid =
          feeData.length > 0 &&
          feeData.every(
            (fee) => Number(fee.request_status) === 1
          );

        if (!paid) {
          alert("Please complete payment first");
          navigate(`/user/payment/${id}`);
        } else {
          axios
            .get(`http://127.0.0.1:8000/Requestreport/${id}/`)
            .then((res) => {
              setReports(res.data.reports || []);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>View Report</h2>

        {reports.length > 0 ? (
          reports.map((report, index) => (
            <div key={report.id} className={Styles.reportBox}>
              <p><strong>Report {index + 1}</strong></p>

              <p>
                <b>Details:</b> {report.requestreport_details}
              </p>

              <img
            src={
              report.requestreport_file
                ? `http://127.0.0.1:8000/${report.requestreport_file}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
              alt={`Report ${index + 1}`}
              className={Styles.reportImage}
            
          />

              <hr />
            </div>
          ))
        ) : (
          <p>No report found</p>
        )}
      </div>
    </div>
  );
};

export default ViewReport;
