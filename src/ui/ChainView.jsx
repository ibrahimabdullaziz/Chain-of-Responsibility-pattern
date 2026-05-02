import React from "react";
import { Node } from "./Node";

export function ChainView({ nodes }) {
  return (
    <div className="chain-view">
      {nodes.map((node, index) => (
        <React.Fragment key={node.id}>
          <Node node={node} />
          {index < nodes.length - 1 && (
            <div className="connector">
              <div className="arrow" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
