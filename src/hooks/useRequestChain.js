import { useMemo, useState } from "react";
import { Auth } from "../core/Auth";
import { Cache } from "../core/Cache";
import { Logger } from "../core/Logger";
import { Retry } from "../core/Retry";
import { Sender } from "../core/Sender";

const initialSettings = {
  authEnabled: true,
  cacheEnabled: true,
  loggerEnabled: true,
  retryEnabled: true,
  validToken: true,
  cacheHit: false,
  networkFailsFirstTry: false,
};

function createInitialNodes() {
  return [
    { id: "auth", name: "Auth", status: "idle", message: "Waiting" },
    { id: "cache", name: "Cache", status: "idle", message: "Waiting" },
    { id: "logger", name: "Logger", status: "idle", message: "Waiting" },
    { id: "retry", name: "Retry", status: "idle", message: "Waiting" },
    { id: "sender", name: "Sender", status: "idle", message: "Waiting" },
  ];
}

function buildChain() {
  const auth = new Auth();
  const cache = new Cache();
  const logger = new Logger();
  const retry = new Retry();
  const sender = new Sender();

  auth.setNext(cache).setNext(logger).setNext(retry).setNext(sender);

  return auth;
}

export function useRequestChain() {
  const [settings, setSettings] = useState(initialSettings);
  const [nodes, setNodes] = useState(createInitialNodes);
  const [logs, setLogs] = useState(["Ready to send API request."]);
  const [result, setResult] = useState("Press Send Request to start.");
  const [isRunning, setIsRunning] = useState(false);

  const request = useMemo(
    () => ({
      url: "/api/orders",
      token: settings.validToken ? "demo-token" : "",
      attempts: 0,
      maxRetries: 0,
      logs: [],
      response: "",
      settings,
    }),
    [settings],
  );

  function updateSettings(newSettings) {
    setSettings((current) => ({ ...current, ...newSettings }));
  }

  function updateNode(id, status, message) {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === id ? { ...node, status, message } : node,
      ),
    );

    setLogs((currentLogs) => [...currentLogs, `${id}: ${message}`]);
  }

  async function sendRequest() {
    setIsRunning(true);
    setNodes(createInitialNodes());
    setLogs(["New API request created."]);
    setResult("Request is moving through the chain...");

    const chain = buildChain();
    const finalResult = await chain.handle(request, updateNode);

    const responseText = request.response ? ` ${request.response}` : "";
    setResult(`${finalResult.message}${responseText}`);
    setLogs((currentLogs) => [...currentLogs, ...request.logs]);
    setIsRunning(false);
  }

  return {
    nodes,
    logs,
    result,
    isRunning,
    settings,
    updateSettings,
    sendRequest,
  };
}
