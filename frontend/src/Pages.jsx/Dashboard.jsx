import React, { useContext, useState ,Suspense, lazy} from "react";

const LineChart = lazy(() =>
  import("react-chartjs-2").then((module) => ({ default: module.Line }))
);
import "chart.js/auto";
import "../styles/Dashboard.css";
import { AppContext } from "../contex/AppContext";
import { useEffect } from "react";


const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [summary, setSummary] = useState({ success: 0, failure: 0 ,warning:0});
  const [timeRange, setTimeRange] = useState("24h");

  useEffect(() => {
    fetch(`https://hrmonitorinterface.onrender.com/api/logs/trend?range=${timeRange}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSummary(data.summary);
        setChartData({
          labels: data.labels,
          datasets: [
            { label: "Success", data: data.success, borderColor: "#28a745", backgroundColor: "rgba(40,167,69,0.2)", fill: true },
            { label: "Failure", data: data.failure, borderColor: "#dc3545", backgroundColor: "rgba(220,53,69,0.2)", fill: true },
            { label: "Warning", data: data.warning, borderColor: "#c0dc35ff", backgroundColor: "rgba(220,53,69,0.2)", fill: true }
          ]
        });
      });
  }, [timeRange]);

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
          <option value="1m">Last Month</option>
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
        <div className="summary-card warning-card"
          
        >
          <h3>Warning</h3>
          <p>{summary.warning}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <h2>Execution Trend</h2>
        <Suspense fallback={<p>Loading Chart...</p>}>
          {chartData.labels && <LineChart data={chartData} />}
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard

