import { ChainNode } from "../hooks/useRequestChain";

type NodeProps = {
  node: ChainNode;
  showArrow: boolean;
};

export function Node({ node, showArrow }: NodeProps) {
  return (
    <article className="node">
      <h3>{node.name}</h3>
      <span className={`badge ${node.status}`}>{node.status}</span>
      <p>{node.message}</p>
      {showArrow && <span className="arrow">→</span>}
    </article>
  );
}
