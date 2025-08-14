import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About HR Dashboard</h1>
        <p className="intro-text">
          The <strong>HR Dashboard</strong> is a powerful platform designed to help HR
          professionals track employee assessments, performance, and submissions in real-time.
          It offers insightful charts, quick stats, and detailed reports to make data-driven
          decisions easier than ever.
        </p>

        <div className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>📊 Real-time employee assessment tracking</li>
            <li>📅 Submission deadlines & reminders</li>
            <li>🏆 Performance ranking by department</li>
            <li>📈 Visual analytics with charts & graphs</li>
            <li>🔍 Quick search & filtering options</li>
          </ul>
        </div>

        <div className="about-goal">
          <h2>Our Goal</h2>
          <p>
            To empower HR teams with an intuitive and modern dashboard that provides
            instant insights, improves decision-making, and enhances overall employee engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
