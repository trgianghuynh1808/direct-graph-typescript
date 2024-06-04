export type TVertex = string;

export type TAdjacencyOfVertex = TVertex[];

export type TAdjacencyList = Record<TVertex, TAdjacencyOfVertex>;

export type TEdge = [TVertex, TVertex]; // [from, to]

export type TChangedResult = {
  removed: {
    vertexes: TVertex[];
    edges: TEdge[];
  } | null;
  created: {
    vertexes: TVertex[];
    edges: TEdge[];
  } | null;
};

class DirectGraph {
  public adjacencyList: TAdjacencyList;

  constructor() {
    this.adjacencyList = {};
  }

  public getEdges(): TEdge[] {
    const edges: TEdge[] = [];

    Object.keys(this.adjacencyList).forEach((fromVertex) => {
      const adjacencyOfVertex = this.adjacencyList[fromVertex] ?? [];

      edges.push(
        ...adjacencyOfVertex.map((toVertex) => {
          return [fromVertex, toVertex] as TEdge;
        }),
      );
    });

    return edges;
  }

  public getVertexes(): TVertex[] {
    return Object.keys(this.adjacencyList);
  }

  public addVertex(vertex: TVertex): TChangedResult | undefined {
    const existsVertex = Boolean(this.adjacencyList[vertex]);

    if (existsVertex) {
      return;
    }

    this.adjacencyList[vertex] = [];

    return {
      removed: null,
      created: {
        edges: [],
        vertexes: [vertex],
      },
    };
  }

  public addEdge(from: TVertex, to: TVertex): TChangedResult | undefined {
    // *INFO: add new from vertex if this vertex not exists
    const newVertexes = [] as TVertex[];

    if (!this.adjacencyList[from]) {
      const changedResult = this.addVertex(from);
      newVertexes.push(changedResult?.created?.vertexes[0]!);
    }

    // *INFO: add new to vertex if this vertex not exists
    if (!this.adjacencyList[to]) {
      const changedResult = this.addVertex(to);
      newVertexes.push(changedResult?.created?.vertexes[0]!);
    }

    // *INFO: check exists edge
    const existsEdge = Boolean(this.adjacencyList[from]?.includes(to));

    if (existsEdge) {
      return;
    }

    const existsReverseEdge = Boolean(this.adjacencyList[to]?.includes(from));

    // *INFO: with Direct Graph don't have one more relation between two route points
    if (existsReverseEdge) {
      return;
    }

    this.adjacencyList[from]!.push(to);

    return {
      removed: null,
      created: {
        vertexes: newVertexes,
        edges: [[from, to]],
      },
    };
  }

  public removeEdge(from: TVertex, to: TVertex): TChangedResult | undefined {
    const fromAdjacency = this.adjacencyList[from];
    const toAdjacency = this.adjacencyList[to];

    if (!fromAdjacency || !toAdjacency) {
      return;
    }

    this.adjacencyList[from] = (this.adjacencyList[from] ?? []).filter(
      (item) => {
        return item !== to;
      },
    );

    return {
      created: null,
      removed: {
        edges: [[from, to]],
        vertexes: [],
      },
    };
  }

  public removeVertex(vertex: TVertex): TChangedResult | undefined {
    const currentAdjacency = this.adjacencyList[vertex];
    const newEdges = [] as TEdge[];

    if (!currentAdjacency) {
      return;
    }

    const incomingVertexes = Object.keys(this.adjacencyList).filter((key) => {
      return this.adjacencyList[key]?.includes(vertex);
    });

    // *INFO: reconnect with incoming & outgoing vertex after removed vertex
    for (const i of incomingVertexes) {
      for (const j of currentAdjacency) {
        const newEdgeChangedResult = this.addEdge(i, j);
        const newEdge = newEdgeChangedResult?.created?.edges[0];
        if (newEdge) {
          newEdges.push(newEdge);
        }
      }
    }

    const removedEdges = (this.adjacencyList[vertex] ?? []).map((item) => {
      return [vertex, item] as TEdge;
    });
    // *INFO: remove vertex
    delete this.adjacencyList[vertex];

    // *INFO: remove related edges
    for (const i of incomingVertexes) {
      this.adjacencyList[i] = (this.adjacencyList[i] ?? []).filter((item) => {
        return item !== vertex;
      });
      removedEdges.push([i, vertex]);
    }

    return {
      created: {
        edges: newEdges,
        vertexes: [],
      },
      removed: {
        edges: [...removedEdges],
        vertexes: [vertex],
      },
    };
  }

  public insertBetweenVertex(
    vertex: TVertex,
    from: TVertex,
    to: TVertex,
  ): TChangedResult | undefined {
    if (this.adjacencyList[vertex]) {
      return;
    }

    if (!this.adjacencyList[from] || !this.adjacencyList[to]) {
      return;
    }

    // *INFO: remove exists edge between from and to
    const removeEdgeChangedResult = this.removeEdge(from, to);

    // *INFO: add edges for new vertex
    const fromVertexChangedResult = this.addEdge(from, vertex);
    const vertexToChangedResult = this.addEdge(vertex, to);

    return {
      removed: {
        edges: [removeEdgeChangedResult?.removed?.edges[0]!],
        vertexes: [],
      },
      created: {
        edges: [
          ...(fromVertexChangedResult?.created?.edges ?? []),
          ...(vertexToChangedResult?.created?.edges ?? []),
        ],
        vertexes: [
          ...(fromVertexChangedResult?.created?.vertexes ?? []),
          ...(vertexToChangedResult?.created?.vertexes ?? []),
        ],
      },
    };
  }

  public print(): void {
    console.log("Print Graph:");
    for (let vertex in this.adjacencyList) {
      console.log(vertex + " -> " + this.adjacencyList[vertex]?.join(", "));
    }
  }
}

const graph = new DirectGraph();

graph.addEdge("A", "B");
graph.addEdge("B", "C");

const res = graph.removeVertex("B");

console.log(JSON.stringify(res, null, 2));

graph.print();

export { DirectGraph };
