import React, { useEffect, useRef } from "react";

export function Logs({ logs }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="logs-container">
      <h2>Processing Logs</h2>
      <div className="logs-window" ref={scrollRef}>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">
            <span className="log-time">{new Date().toLocaleTimeString()}</span>
            <span className="log-text">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
