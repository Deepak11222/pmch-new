// src/components/StoreAdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const StoreAdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/store/dashboard", config);
        setData(data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Store Admin Dashboard</h1>
      {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>} */}
    </div>
  );
};

export default StoreAdminDashboard;