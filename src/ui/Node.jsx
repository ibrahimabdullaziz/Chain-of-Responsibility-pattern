import React from "react";

export function Node({ node }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "var(--status-running)";
      case "success":
        return "var(--status-success)";
      case "failed":
        return "var(--status-failed)";
      case "stopped":
        return "var(--status-stopped)";
      default:
        return "var(--status-idle)";
    }
  };

  return (
    <div className={`node ${node.status}`}>
      <div
        className="status-indicator"
        style={{ backgroundColor: getStatusColor(node.status) }}
      />
      <div className="node-content">
        <h3>{node.name}</h3>
        <p>{node.message}</p>
      </div>
    </div>
  );
}
