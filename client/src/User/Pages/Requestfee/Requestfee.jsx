import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./requestfee.module.css";

const Requestfee = () => {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  const [details, setDetails] = useState("");

  const [fees, setFees] = useState([]);
  const [latestRequestId, setLatestRequestId] = useState(null);


  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/Requestfee/");
      setFees(res.data.requestfee || []);

      
      if (res.data.request && res.data.request.length > 0) {
        const lastReq = res.data.request[res.data.request.length - 1];
        setLatestRequestId(lastReq.id);
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSave = async () => {
    if (!amount || !number || !details) {
      alert("All fields are required");
      return;
    }

    if (!latestRequestId) {
      alert("No request found to attach fee");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/Requestfee/", {
        requestfee_amount: amount,
        requestfee_number: number,
        requestfee_details: details,
        request_id: latestRequestId,
      });

      alert("Request fee added successfully");
      setAmount("");
      setNumber("");
      setDetails("");
      fetchData();
    } catch (err) {
      console.error("Save error", err);
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>

        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Request Fee</h2>

          <input
            type="text"
            className={Styles.input}
            placeholder="Request Fee Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            className={Styles.input}
            placeholder="Request Fee Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <textarea
            className={Styles.textarea}
            placeholder="Request Fee Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Submit
          </button>
        </div>

     
        <div className={Styles.tableWrapper}>
          <h3 className={Styles.tableTitle}>Request Fee List</h3>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>SI NO</th>
                <th>Request</th>
                <th>Amount</th>
                <th>Number</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {fees.length > 0 ? (
                fees.map((fee, index) => (
                  <tr key={fee.id}>
                    <td>{index + 1}</td>
                    <td>{fee.request_id_id}</td>
                    <td>{fee.requestfee_amount}</td>
                    <td>{fee.requestfee_number}</td>
                    <td>{fee.requestfee_details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No request fees found
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

export default Requestfee;
