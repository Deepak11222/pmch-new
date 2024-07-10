import React from "react";
import "./DashboardScreen.css";
import Sidebar from "./Sidebar";
import MainDash from "../MainDash/MainDash";

const Dashboard = () => {
  return (
    <div className='App'>
      {/* <div className="AppGlass"> */}
        <Sidebar />
        {/* <MainDash /> */}
      </div>
    // </div>
  );
}

export default Dashboard;