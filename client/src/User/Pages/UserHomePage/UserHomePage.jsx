import React from "react";
import { Routes, Route, useLocation } from "react-router";
import UserRouter from "../../../Routes/UserRouter";
import UserNavbar from "../../Components/Navbar/Navbar";
import UserSidebar from "../../Components/Sidebar/Sidebar";
import Styles from "./userhomepage.module.css";

const UserHomePage = () => {
  const location = useLocation();

  const showSidebar =
    location.pathname === "/user" || location.pathname === "/user/";

  return (
    <div className={Styles.container}>
      {showSidebar && <UserSidebar />}

      <div
        className={Styles.main}
        style={{
          marginLeft: showSidebar ? "260px" : "0px",
        }}
      >
        <UserNavbar showSidebar={showSidebar} />

        <div className={Styles.content}>
          <Routes>
            <Route path="/*" element={<UserRouter />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;