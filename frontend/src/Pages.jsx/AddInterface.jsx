import React, { useState } from "react";
import axios from "axios";
import "../styles/AddInterfaceLog.css"; 

const AddInterfaceLog = () => {
  const [formData, setFormData] = useState({
    interfaceName: "",
    integrationKey: "",
    status: "success",
    message: "",
    eventType: "start",
    duration: 0,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("https://hrmonitorinterface.onrender.com/api/logs/add-logs", formData);
      setSuccessMsg("Log added successfully!");
      setFormData({
        interfaceName: "",
        integrationKey: "",
        status: "success",
        message: "",
        eventType: "start",
        duration: 0,
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-log-container">
      <h2>Add Interface Log</h2>
      <form onSubmit={handleSubmit} className="add-log-form">
        <label>
          Interface Name:
          <input
            type="text"
            name="interfaceName"
            value={formData.interfaceName}
            onChange={handleChange}
            required
            className="glowing-border"
          />
        </label>

        <label>
          Integration Key:
          <input
            type="text"
            name="integrationKey"
            value={formData.integrationKey}
            onChange={handleChange}
            required
            className="glowing-border"
          />
        </label>

        <label>
          Status:
          <br />
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange}
            className="glowing-border"
        >
            <option value="success">Success</option>
            <option value="failure">Failure</option>
          </select>
        </label>

        <label>
          Event Type:
          <select 
            name="eventType"
            className="glowing-border" 
            value={formData.eventType} onChange={handleChange}>
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="error">Error</option>
            <option value="retry">Retry</option>
          </select>
        </label>

        <label>
          Duration (seconds):
          <input
            type="number"
            name="duration"
            value={formData.duration}
            min="0"
            onChange={handleChange}
            className="glowing-border"
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="glowing-border"
          ></textarea>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Log"}
        </button>

        {successMsg && <p className="success-msg">{successMsg}</p>}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default AddInterfaceLog;
