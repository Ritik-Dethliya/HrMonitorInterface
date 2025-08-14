import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About SAP Interface Dashboard</h1>
        <p className="intro-text">
          The <strong>SAP Interface Dashboard</strong> is designed to monitor SAP system
          interfaces in real-time. It tracks execution status, failures, and warnings, helping
          administrators quickly identify issues and maintain smooth operations.
        </p>

        <div className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>📊 Real-time status monitoring of SAP interfaces</li>
            <li>⚠️ Immediate alerts for failures and warnings</li>
            <li>📈 Trend charts for interface executions</li>
            <li>🔍 Quick search and filtering of logs</li>
            <li>🗂️ Summary of successful, failed, and warning executions</li>
          </ul>
        </div>

        <div className="about-goal">
          <h2>Our Goal</h2>
          <p>
            To provide a comprehensive and modern dashboard that enables administrators
            to maintain system reliability, quickly respond to issues, and optimize SAP
            interface operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
