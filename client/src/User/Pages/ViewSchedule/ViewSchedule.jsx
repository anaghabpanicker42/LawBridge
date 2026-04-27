import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import Styles from "./viewschedule.module.css";

const ViewSchedule = () => {
  const { id } = useParams(); 
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/GetSchedules/${id}/`);
        setSchedules(res.data.schedules || []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Failed to load schedules. Please try again.");
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [id]);

  return (
    <div className={Styles.page}>
      <h2>View Schedules</h2>

      {loading ? (
        <p className={Styles.loading}>Loading schedules...</p>
      ) : errorMsg ? (
        <p className={Styles.loading}>{errorMsg}</p>
      ) : schedules.length === 0 ? (
        <p className={Styles.noSchedule}>No schedules added yet.</p>
      ) : (
        <table className={Styles.table}>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Date</th>
              <th>Time</th>
              <th>Meeting Link / Venue</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.schedule_date}</td>
                <td>{s.schedule_time}</td>
                <td>
                  {s.schedule_link ? (
                    <a href={s.schedule_link} target="_blank" rel="noreferrer">
                      {s.schedule_link}
                    </a>
                  ) : s.schedule_venue ? (
                    s.schedule_venue
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}


      <div className={Styles.viewReportContainer}>
        <Link to={`/user/viewreport/${id}`} className={Styles.viewReportBtn}>
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default ViewSchedule;