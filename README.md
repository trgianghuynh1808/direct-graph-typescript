# Direct Graph Typescript


## Overview
![SCC1](https://github.com/trgianghuynh1808/direct-graph-typescript/assets/49706073/06c80234-3458-4979-8728-f90b8b856ac0)

A directed graph is defined as a type of graph where the edges have a direction associated with them. The repo will implement Direct Graph by Typescript. We can run like NodeJS app to see more details.

This repo has methods:
- [getEdges](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L27)
- [getVertexes](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L43)
- [addVertex](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L47)
- [addEdge](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L65)
- [removeEdge](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L105)
- [removeVertex](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L128)
- [insertBetweenVertex](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L177)
- [print](https://github.com/trgianghuynh1808/direct-graph-typescript/blob/b40aff55c58224fa7d0c4d71d3ef9938881c3807/src/index.ts#L215)

## Example
```
const graph = new DirectGraph();

graph.addEdge("A", "B");
graph.addEdge("B", "C");

graph.print();
// A -> B
// B -> C
// C ->

const res = graph.removeVertex("B");

graph.print();
// A -> C
```

