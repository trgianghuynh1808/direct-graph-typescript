type TVertex = string;

type TAdjacencyOfVertex = TVertex[];

type TAdjacencyList = Record<TVertex, TAdjacencyOfVertex>;

class DirectGraph {
  public adjacencyList: TAdjacencyList;

  constructor() {
    this.adjacencyList = {};
  }

  public addVertex(vertex: TVertex): void {
    const existsVertex = Boolean(this.adjacencyList[vertex]);

    if (existsVertex) {
      return;
    }

    this.adjacencyList[vertex] = [];
  }

  public addEdge(from: TVertex, to: TVertex): void {
    // *INFO: add new from vertex if this vertex not exists
    if (!this.adjacencyList[from]) {
      this.addVertex(from);
    }

    // *INFO: add new to vertex if this vertex not exists
    if (!this.adjacencyList[to]) {
      this.addVertex(to);
    }

    // *INFO: check exists edge
    const existsEdge = Boolean(this.adjacencyList[from]?.includes(to));

    if (existsEdge) {
      console.error(`Error: the edge ${from} -> ${to} was exists`);
      return;
    }

    const existsReverseEdge = Boolean(this.adjacencyList[to]?.includes(from));

    // *INFO: with Direct Graph don't have one more relation between two route points
    if (existsReverseEdge) {
      console.error(`Error: the edge ${from} -> ${to} was exists reverse`);
      return;
    }

    this.adjacencyList[from]!.push(to);
  }

  public removeEdge(from: TVertex, to: TVertex): void {
    const fromAdjacency = this.adjacencyList[from];
    const toAddjacency = this.adjacencyList[to];

    if (!fromAdjacency || !toAddjacency) {
      console.error("Error: don't exits from or to vertex");
      return;
    }

    this.adjacencyList[from] = (this.adjacencyList[from] ?? []).filter(
      (item) => {
        return item !== to;
      },
    );
  }

  public removeVertex(vertex: TVertex): void {
    const currentAdjacency = this.adjacencyList[vertex];

    if (!currentAdjacency) {
      console.error(`Error: don't exits ${vertex} vertex`);
      return;
    }

    const incomingVertexs = Object.keys(this.adjacencyList).filter((key) => {
      return this.adjacencyList[key]?.includes(vertex);
    });

    // *INFO: reconnect with incoming & outgoing vertex after removed vertex
    for (const i of incomingVertexs) {
      for (const j of currentAdjacency) {
        this.addEdge(i, j);
      }
    }

    // *INFO: remove vertex
    delete this.adjacencyList[vertex];

    // *INFO: remove related edgeds
    for (const i of incomingVertexs) {
      this.adjacencyList[i] = (this.adjacencyList[i] ?? []).filter((item) => {
        return item !== vertex;
      });
    }
  }

  public insertBetweenVertex(
    vertex: TVertex,
    from: TVertex,
    to: TVertex,
  ): void {
    if (this.adjacencyList[vertex]) {
      console.error(`Error: the ${vertex} was exists`);
      return;
    }

    if (!this.adjacencyList[from] || !this.adjacencyList[to]) {
      console.error(
        `Error: the from ${from} vertex or to ${to} vertex not exists`,
      );
      return;
    }

    // *INFO: remove exists edge between from and to
    this.removeEdge(from, to);

    // *INFO: add edges for new vertex
    this.addEdge(from, vertex);
    this.addEdge(vertex, to);
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
graph.addEdge("D", "B");
graph.addEdge("C", "E");
graph.insertBetweenVertex("Z", "A", "B");

graph.print();
// graph.removeEdge("A", "E");
graph.removeVertex("B");

graph.print();
