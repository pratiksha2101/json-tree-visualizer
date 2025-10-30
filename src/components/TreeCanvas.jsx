import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

export default function TreeCanvas({ nodes, edges, highlightedId }) {
  const styledNodes = nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      border:
        node.id === highlightedId ? "3px solid #f59e0b" : "1px solid #93c5fd",
      boxShadow:
        node.id === highlightedId
          ? "0 0 10px 3px rgba(245,158,11,0.6)"
          : "none",
    },
  }));

  return (
    <div className="tree-canvas">
      <ReactFlow nodes={styledNodes} edges={edges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
