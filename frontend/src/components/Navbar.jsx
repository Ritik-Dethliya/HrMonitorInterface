import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">Interface Monitor</div>

      {/* Desktop Menu */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="/">Dashboard</a></li>
        <li><a href="/logs">Logs</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/add-log">Addlog</a></li>
      </ul>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
