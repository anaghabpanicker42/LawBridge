import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Styles from "./searchlawyer.module.css";

const SearchLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const { categoryId } = useParams(); // get category ID from route

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        // Call backend with category query param
        const url = categoryId
          ? `http://127.0.0.1:8000/Lawyer/?category=${categoryId}`
          : `http://127.0.0.1:8000/Lawyer/`;

        const res = await axios.get(url);
        setLawyers(res.data.lawyers || []);
      } catch (err) {
        console.error("Error fetching lawyers:", err);
      }
    };

    fetchLawyers();
  }, [categoryId]);

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Available Lawyers</h2>

          <table className={Styles.table}>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Photo</th>
                <th>Place</th>
                <th>Categories</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.length > 0 ? (
                lawyers.map((l, i) => (
                  <tr key={l.id}>
                    <td>{i + 1}</td>
                    <td className={Styles.name}>{l.lawyer_name}</td>
                    <td>{l.lawyer_email}</td>
                    <td>
                      {l.lawyer_photo ? (
                        <img
                          src={l.lawyer_photo}
                          alt="lawyer"
                          className={Styles.image}
                        />
                      ) : (
                        "No Photo"
                      )}
                    </td>
                    <td>{l.place_name || "N/A"}</td>
                    <td>
                      {l.categories.length > 0
                        ? l.categories.map((c) => c.category_name).join(", ")
                        : "No Category"}
                    </td>
                    <td>
                      <Link
                        to={`/user/request/${l.id}`}
                        className={Styles.requestBtn}
                      >
                        Send Request
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" align="center">
                    No accepted lawyers found
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

export default SearchLawyer;