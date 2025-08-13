import React, { useContext, useState } from "react";
import "../styles/Logs.css";
import { AppContext } from "../contex/AppContext";

const Logs = () => {
  const { logs } = useContext(AppContext);
  const [searchInterface, setSearchInterface] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  // Filter + Pagination
  const filteredLogs = logs.filter((log) => {
    return (
      log.interfaceName.toLowerCase().includes(searchInterface.toLowerCase()) &&
      (searchStatus ? log.status === searchStatus : true)
    );
  });

  const paginatedLogs = filteredLogs.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filteredLogs.length / limit);

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
          {paginatedLogs.map((log) => (
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

      {/* Mobile Card View */}
      <div className="logs-cards">
        {paginatedLogs.map((log) => (
          <div className="log-card" key={log.integrationKey}>
            <h3>{log.interfaceName}</h3>
            <p><strong>Key:</strong> {log.integrationKey}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status-tag ${log.status.toLowerCase()}`}>
                {log.status}
              </span>
            </p>
            <p><strong>Message:</strong> {log.message}</p>
            <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Logs;
