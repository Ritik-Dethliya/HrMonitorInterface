import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/Dashboard.css";
import { AppContext } from "../contex/AppContext";

const Dashboard = () => {
  const { summary, trendData } = useContext(AppContext);
  const [timeRange, setTimeRange] = useState("24h");

  const chartData = {
    labels: trendData.map((d) => d.date),
    datasets: [
      {
        label: "Success",
        data: trendData.map((d) => d.success),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        fill: true,
      },
      {
        label: "Failure",
        data: trendData.map((d) => d.failure),
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Interface Monitoring Dashboard</h1>
        <select
          className="time-filter"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last Week</option>
          <option value="30d">Last Month</option>
          <option value="custom">Custom Date Range</option>
        </select>
      </header>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card success-card">
          <h3>Success</h3>
          <p>{summary.success}</p>
        </div>
        <div className="summary-card failure-card">
          <h3>Failure</h3>
          <p>{summary.failure}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h2>Execution Trend</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
