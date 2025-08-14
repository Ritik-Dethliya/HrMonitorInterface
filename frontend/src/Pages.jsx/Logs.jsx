import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Logs.css";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [searchInterface, setSearchInterface] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    getLogs();
  }, [page, searchInterface, searchStatus]);

  async function getLogs() {
    try {
      const res = await axios.get("http://localhost:8000/api/logs", {
        params: {
          page,
          limit,
          searchInterface,
          searchStatus
        }
      });
      console.log(res.data)
      setLogs(res.data.logs);
      setTotalPages(Math.ceil(res.data.total/limit));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="logs-container">
      <header className="logs-header">
        <h1>Live Interface Logs</h1>
        <button className="advanced-filter-btn">Advanced Filters</button>
      </header>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by Interface Name"
          value={searchInterface}
          onChange={(e) => setSearchInterface(e.target.value)}
        />
        <select
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILURE">Failure</option>
          <option value="WARNING">Warning</option>
        </select>
      </div>

      {/* Desktop Table */}
      <table className="logs-table">
        <thead>
          <tr>
            <th>Interface Name</th>
            <th>Integration Key</th>
            <th>Status</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.integrationKey}>
              <td>{log.interfaceName}</td>
              <td>{log.integrationKey}</td>
              <td>
                <span className={`status-tag ${log.status.toLowerCase()}`}>
                  {log.status}
                </span>
              </td>
              <td>{log.message}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages+1))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Logs;
