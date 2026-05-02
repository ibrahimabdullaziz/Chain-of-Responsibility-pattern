type LogsProps = {
  logs: string[];
};

export function Logs({ logs }: LogsProps) {
  return (
    <section className="panel">
      <h2>Logs</h2>
      <pre>{logs.join("\n")}</pre>
    </section>
  );
}
