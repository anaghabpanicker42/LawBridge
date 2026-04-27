import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./categorysearch.module.css";   
import { useNavigate } from "react-router-dom";

const CategorySearch = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/Category/");
        const categoryList = res.data.categories || res.data.data || [];
        setCategories(categoryList);
      } catch (err) {
        console.error("Error fetching categories:", err);
        alert("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => setSelectedCategory(e.target.value);

  const handleSearch = () => {
    if (!selectedCategory) {
      alert("Please select a category");
      return;
    }
    // Navigate to SearchLawyer page with category ID
    navigate(`/user/searchlawyer/${selectedCategory}`);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <h2 className={Styles.title}>Search Lawyers by Category</h2>

        <div className={Styles.formGroup}>
          <label className={Styles.label}>Category</label>
          <select
            className={Styles.select}
            value={selectedCategory}
            onChange={handleChange}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        <button className={Styles.searchBtn} onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default CategorySearch;