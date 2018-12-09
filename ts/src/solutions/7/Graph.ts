export class Graph {
  adjList: AdjacencyList

  constructor(links: [string, string][]) {
    this.adjList = new Map();
    links.forEach(([s1, s2]: [string, string]) => {
      this.adjList.set(s1, [...(this.adjList.get(s1) || []), s2]);
      if (!this.adjList.has(s2)) {
        this.adjList.set(s2, []);
      }
    });
  }
}

type AdjacencyList = Map<string, string[]>;
