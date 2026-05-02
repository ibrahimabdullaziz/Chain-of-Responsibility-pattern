import React, { useState } from "react";
import { buildChain } from "./chain";
import "./styles.css";

const HANDLERS = ["Auth", "Cache", "Logger", "Sender"];

function App() {
  const [token, setToken]       = useState(true);
  const [useCache, setUseCache] = useState(false);
  const [steps, setSteps]       = useState([]);
  const [result, setResult]     = useState(null);
  const [running, setRunning]   = useState(false);

  async function run() {
    setRunning(true);
    setSteps([]);
    setResult(null);

    const request = {
      url: "/api/data",
      token: token ? "abc123" : "",
      useCache,
    };

    function log(handler, message, status) {
      setSteps((prev) => [...prev, { handler, message, status }]);
    }

    const chain = buildChain();
    const final = await chain.handle(request, log);

    setResult(final.message || "Chain completed.");
    setRunning(false);
  }

  return (
    <div className="app">
      <h1>Chain of Responsibility</h1>
      <p className="subtitle">Each handler decides: <strong>pass it on</strong> or <strong>stop here</strong>.</p>

      {/* ── Controls ── */}
      <div className="controls">
        <label>
          <input type="checkbox" checked={token} onChange={(e) => setToken(e.target.checked)} />
          Has Token
        </label>
        <label>
          <input type="checkbox" checked={useCache} onChange={(e) => setUseCache(e.target.checked)} />
          Cache Hit
        </label>
        <button onClick={run} disabled={running}>
          {running ? "Running…" : "▶ Send Request"}
        </button>
      </div>

      {/* ── Chain Visualization ── */}
      <div className="chain">
        {HANDLERS.map((name, i) => {
          const step = steps.find((s) => s.handler === name);
          return (
            <React.Fragment key={name}>
              <div className={`node ${step ? step.status : "idle"}`}>
                <span className="node-name">{name}</span>
                {step && <span className="node-msg">{step.message}</span>}
              </div>
              {i < HANDLERS.length - 1 && (
                <div className={`arrow ${step && step.status !== "success" ? "blocked" : ""}`}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Result ── */}
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;
