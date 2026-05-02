import { ChainNode } from "../hooks/useRequestChain";
import { Node } from "./Node";

type ChainViewProps = {
  nodes: ChainNode[];
  result: string;
};

export function ChainView({ nodes, result }: ChainViewProps) {
  return (
    <section className="panel">
      <div className="panelHeader">
        <h2>Request Flow</h2>
        <p>{result}</p>
      </div>

      <div className="chain">
        {nodes.map((node, index) => (
          <Node
            key={node.id}
            node={node}
            showArrow={index < nodes.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
