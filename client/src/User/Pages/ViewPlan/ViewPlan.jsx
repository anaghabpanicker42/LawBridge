import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Styles from "./viewplan.module.css";

const ViewPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/Plan/");
        setPlans(res.data.plans || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePurchase = () => {
    if (!selectedPlan) {
      alert("Please select a plan to purchase.");
      return;
    }

    // ✅ Send plan id in URL
    navigate(`/payment/${selectedPlan.id}`);
  };

  if (loading) return <p className={Styles.loading}>Loading plans...</p>;

  return (
    <div className={Styles.page}>
      <h2>Available Plans</h2>
      <div className={Styles.planContainer}>
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`${Styles.planCard} ${selectedPlan?.id === plan.id ? Styles.selected : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3>{plan.plan_name}</h3>
            <p>Duration: {plan.plan_duration} days</p>
            <p>Price: ₹{plan.plan_price}</p>
          </div>
        ))}
      </div>

      {plans.length > 0 && (
        <div className={Styles.purchaseContainer}>
          <button className={Styles.purchaseBtn} onClick={handlePurchase}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewPlan;