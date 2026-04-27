import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./myrequest.module.css";
import { useNavigate } from "react-router-dom";

const MyRequest = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = sessionStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {

    if (!uid) return;

    axios
      .get(`http://127.0.0.1:8000/Request/?user_id=${uid}`)
      .then((res) => {

        console.log(res.data.requests);

        setRequests(res.data.requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, [uid]);


  const renderPaymentSection = (req) => {

    const status = Number(req.request_status);
    const fee = Number(req.request_fee);
    const payment = Number(req.payment_status);

    // Waiting for lawyer
    if (status === 0) {
      return (
        <span className={Styles.waitingBadge}>
          Waiting for Lawyer Approval
        </span>
      );
    }

    // Lawyer rejected
    if (status === 2) {
      return (
        <span className={Styles.rejectedBadge}>
          Lawyer Rejected Your Case
        </span>
      );
    }

    // Accepted but fee not added
    if (status === 1 && fee === 0) {
      return (
        <span className={Styles.waitingBadge}>
          Fee not added yet
        </span>
      );
    }

    // Fee added but payment pending
    if (status === 1 && fee > 0 && payment === 0) {
      return (
        <button
          className={Styles.payBtn}
          onClick={() => navigate(`/feepayment/${req.requestfee_id}`)}
        >
          Pay Now
        </button>
      );
    }

    // Payment completed
    if (payment === 1) {
      return (
        <div className={Styles.statusBox}>

          <span className={Styles.paidBadge}>
            Payment Completed
          </span>

          <button
            className={Styles.viewBtn}
            onClick={() => navigate(`/user/viewschedule/${req.id}`)}
          >
            View Schedule
          </button>

        </div>
      );
    }

    return (
      <span className={Styles.waitingBadge}>
        Waiting for Lawyer
      </span>
    );
  };


  return (
    <div className={Styles.page}>

      <div className={Styles.container}>

        <h2 className={Styles.heading}>
          My Requests
        </h2>

        {loading ? (

          <div className={Styles.loader}>
            Loading...
          </div>

        ) : requests.length === 0 ? (

          <div className={Styles.empty}>
            No requests found
          </div>

        ) : (

          <div className={Styles.tableWrapper}>

            <table className={Styles.table}>

              <thead>

                <tr>
                  <th>#</th>
                  <th>Level</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {requests.map((req, index) => (

                  <tr key={req.id}>

                    <td>{index + 1}</td>

                    <td>
                      {req.level_name || "-"}
                    </td>

                    <td>
                      {req.type_name || "-"}
                    </td>

                    <td>
                      {req.request_date}
                    </td>

                    <td>
                      {renderPaymentSection(req)}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default MyRequest;