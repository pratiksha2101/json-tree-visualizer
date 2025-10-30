import React, { useState } from "react";
import HeaderBar from "./components/HeaderBar";
import LeftPanel from "./components/LeftPanel";
import TreeCanvas from "./components/TreeCanvas";
import FooterBar from "./components/FooterBar";
import "./styles/App.scss";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [highlightedId, setHighlightedId] = useState(null);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <HeaderBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="main-layout">
        <LeftPanel
          onGenerateTree={(n, e) => {
            setNodes(n);
            setEdges(e);
            setHighlightedId(null);
          }}
          onReset={() => {
            setNodes([]);
            setEdges([]);
            setHighlightedId(null);
          }}
          onSearch={(id) => setHighlightedId(id)}
        />

        <TreeCanvas nodes={nodes} edges={edges} highlightedId={highlightedId} />
      </main>

      <FooterBar />
    </div>
  );
}
