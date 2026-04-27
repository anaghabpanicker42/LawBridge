import React, { useState } from "react";
import Styles from "./rating.module.css";
import axios from "axios";
import Box from "@mui/material/Box";
import RatingMUI from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const Rating = () => {
  const [count, setCount] = useState(2);
  const [hover, setHover] = useState(-1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const userId = sessionStorage.getItem("user_id"); // session user

  const handleSave = async () => {
    if (!count || !comment) {
      setMessage("Please provide both a rating and a comment.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/Rating/", {
        rating_count: count,
        rating_comment: comment,
        user_id: userId,
      });

      setCount(2);
      setHover(-1);
      setComment("");
      setMessage("Rating added successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add rating. Try again.");
    }
  };

  return (
    <div className={Styles.page}>
      <div className={Styles.container}>
        <div className={Styles.card}>
          <h2 className={Styles.title}>Add Your Rating</h2>

          <div className={Styles.ratingBox}>
            <RatingMUI
              name="full-star-rating"
              value={count}
              getLabelText={getLabelText}
              onChange={(event, newValue) => setCount(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <span className={Styles.ratingLabel}>
              {labels[hover !== -1 ? hover : count]}
            </span>
          </div>

          <textarea
            placeholder="Write your comment here..."
            className={Styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className={Styles.button} onClick={handleSave}>
            Submit Rating
          </button>

          {message && (
            <div
              className={
                message.includes("success") ? Styles.successMessage : Styles.errorMessage
              }
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rating;