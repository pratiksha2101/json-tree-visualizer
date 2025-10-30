import React, { useState } from "react";
import { generateTree } from "../utils/generateTree";
import { findNodeByKey } from "../utils/findNodeByKey";

export default function LeftPanel({ onGenerateTree, onReset, onSearch }) {
  const [jsonInput, setJsonInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = () => {
    try {
      const data = JSON.parse(jsonInput);
      const { nodes, edges } = generateTree(data);
      onGenerateTree(nodes, edges);
      setError("");
    } catch {
      setError("⚠️ Invalid JSON format. Please correct it.");
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a key to search.");
      return;
    }
    onSearch(searchQuery.trim());
    setError("");
  };

  return (
    <aside className="left-panel">
      <h2>Input JSON</h2>
      <textarea
        placeholder={`{\n  "name": "John",\n  "age": 25,\n  "city": "Pune"\n}`}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <div className="button-group">
        <button onClick={handleGenerate}>Generate</button>
        <button onClick={onReset}>Reset</button>
      </div>

      <div className="search-section">
        <h3>Search Node</h3>
        <input
          type="text"
          placeholder="Enter key name (e.g., name)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="tips">
        <p>💡 Tips:</p>
        <ul>
          <li>Write valid JSON before clicking “Generate”.</li>
          <li>Search nodes by key name (case-insensitive).</li>
        </ul>
      </div>
    </aside>
  );
}
