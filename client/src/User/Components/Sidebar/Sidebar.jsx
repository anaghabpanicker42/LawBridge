import React from "react";
import { Link, useLocation } from "react-router";
import styles from "./sidebar.module.css";

const UserSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: "🏠" },
    { name: "View Plan", path: "/user/viewplan", icon: "📦" },
    { name: "My Requests", path: "/user/myrequest", icon: "📄" },
    { name: "Complaint", path: "/user/complaint", icon: "📢" },
    { name: "Rating", path: "/user/rating", icon: "⭐" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        ⚖ LAWBRIDGE
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${styles.menuItem} ${
              location.pathname === item.path ? styles.active : ""
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className={styles.logout}>
        🚪 Logout
      </div>
    </aside>
  );
};

export default UserSidebar;