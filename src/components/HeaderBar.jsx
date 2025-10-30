import React from "react";

export default function HeaderBar({ darkMode, setDarkMode }) {
  return (
    <header className="header-bar">
      <h1>🌳 JSON Tree Visualizer</h1>

      <div className="toggle-mode">
        <span className={!darkMode ? "active" : ""}>Light</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
        <span className={darkMode ? "active" : ""}>Dark</span>
      </div>
    </header>
  );
}
