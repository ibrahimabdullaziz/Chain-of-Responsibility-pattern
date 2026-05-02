import { useRequestChain } from "./hooks/useRequestChain";
import { ChainView } from "./ui/ChainView";
import { Logs } from "./ui/Logs";

export default function App() {
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
    <main className="page">
      <section className="header">
        <p className="label">Chain of Responsibility</p>
        <h1>API Request Flow</h1>
        <p>
          Auth, Cache, Logger, Retry, and Sender are separate handlers. Each
          handler decides if the request should continue or stop.
        </p>
      </section>

      <section className="controls" aria-label="Demo controls">
        <label>
          <input
            type="checkbox"
            checked={settings.authEnabled}
            onChange={(event) =>
              updateSettings({ authEnabled: event.target.checked })
            }
          />
          Auth enabled
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.cacheEnabled}
            onChange={(event) =>
              updateSettings({ cacheEnabled: event.target.checked })
            }
          />
          Cache enabled
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.loggerEnabled}
            onChange={(event) =>
              updateSettings({ loggerEnabled: event.target.checked })
            }
          />
          Logger enabled
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.retryEnabled}
            onChange={(event) =>
              updateSettings({ retryEnabled: event.target.checked })
            }
          />
          Retry enabled
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.validToken}
            onChange={(event) =>
              updateSettings({ validToken: event.target.checked })
            }
          />
          Valid token
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.cacheHit}
            onChange={(event) =>
              updateSettings({ cacheHit: event.target.checked })
            }
          />
          Cache hit
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings.networkFailsFirstTry}
            onChange={(event) =>
              updateSettings({ networkFailsFirstTry: event.target.checked })
            }
          />
          Network fails first try
        </label>

        <button type="button" onClick={sendRequest} disabled={isRunning}>
          {isRunning ? "Sending..." : "Send Request"}
        </button>
      </section>

      <ChainView nodes={nodes} result={result} />
      <Logs logs={logs} />
    </main>
  );
}
