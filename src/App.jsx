import React from "react";
import { useRequestChain } from "./hooks/useRequestChain";
import { ChainView } from "./ui/ChainView";
import { Logs } from "./ui/Logs";
import "./styles.css";

function App() {
  const {
    nodes,
    logs,
    result,
    isRunning,
    settings,
    updateSettings,
    sendRequest,
  } = useRequestChain();

  return (
    <div className="container">
      <header>
        <h1>Chain of Responsibility</h1>
        <p>Middleware Pattern Demo for API Requests</p>
      </header>

      <main>
        <section className="simulation">
          <div className="controls">
            <div className="card">
              <h2>Request Settings</h2>
              
              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.authEnabled}
                    onChange={(e) => updateSettings({ authEnabled: e.target.checked })}
                  />
                  Enable Auth Check
                </label>
                <label className="sub-label">
                  <input
                    type="checkbox"
                    checked={settings.validToken}
                    disabled={!settings.authEnabled}
                    onChange={(e) => updateSettings({ validToken: e.target.checked })}
                  />
                  Token is Valid
                </label>
              </div>

              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.cacheEnabled}
                    onChange={(e) => updateSettings({ cacheEnabled: e.target.checked })}
                  />
                  Enable Caching
                </label>
                <label className="sub-label">
                  <input
                    type="checkbox"
                    checked={settings.cacheHit}
                    disabled={!settings.cacheEnabled}
                    onChange={(e) => updateSettings({ cacheHit: e.target.checked })}
                  />
                  Force Cache Hit
                </label>
              </div>

              <div className="setting-group">
                <label>
                  <input
                    type="checkbox"
                    checked={settings.retryEnabled}
                    onChange={(e) => updateSettings({ retryEnabled: e.target.checked })}
                  />
                  Enable Retry Logic
                </label>
                <label className="sub-label">
                  <input
                    type="checkbox"
                    checked={settings.networkFailsFirstTry}
                    disabled={!settings.retryEnabled}
                    onChange={(e) => updateSettings({ networkFailsFirstTry: e.target.checked })}
                  />
                  Fail First Attempt
                </label>
              </div>

              <button 
                className="btn-primary" 
                onClick={sendRequest} 
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "Send API Request"}
              </button>
            </div>

            <div className="card result-card">
              <h2>Final Result</h2>
              <div className={`status-badge ${isRunning ? 'running' : ''}`}>
                {result}
              </div>
            </div>
          </div>

          <div className="visualization">
            <ChainView nodes={nodes} />
            <Logs logs={logs} />
          </div>
        </section>
      </main>

      <footer>
        <p>Design Pattern: Behavioral / Chain of Responsibility</p>
      </footer>
    </div>
  );
}

export default App;
