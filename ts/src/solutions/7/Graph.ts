import { flatten } from '../../flatten';
import { uniqueFilter } from '../../unique';

export class Graph {
  adjList: AdjacencyList

  constructor(links: [string, string][]) {
    this.adjList = new Map();
    links.forEach(([link1, link2]) => this.addPair(link1, link2));
  }

  addPair(s1: string, s2: string): void {
    this.addVertex(s1);
    this.addVertex(s2);
    this.addEdge(s1, s2);
  }

  addVertex(vertex: string): void {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(vertex: string, edge: string): void {
    this.adjList.set(vertex, [...(this.adjList.get(vertex) || []), edge]);
  }

  deleteVertex(vertex: string): void {
    this.adjList.delete(vertex);
  }

  get vertices(): string[] {
    return [...this.adjList.keys()].sort();
  }

  get edges(): string[] {
    return flatten([...this.adjList.values()])
      .sort()
      .filter(uniqueFilter);
  }

  get available(): string[] {
    return this.vertices.filter(vertext => !this.edges.includes(vertext));
  }

  get nextAvailable(): string | null {
    const available = this.available;
    return available && available[0] || null;
  }

  serialTraverser() {
    const graph = this;
    return {
      *[Symbol.iterator](): IterableIterator<string> {
        let next = graph.nextAvailable;
        while (next) {
          yield next;
          graph.deleteVertex(next);
          next = graph.nextAvailable;
        }
      }
    };
  }  
}

type AdjacencyList = Map<string, string[]>;
