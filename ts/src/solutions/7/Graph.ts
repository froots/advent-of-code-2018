import { Worker } from './Worker';
import { flatten } from '../../flatten';
import { uniqueFilter } from '../../unique';

const CHAR_OFFSET: number = 64;
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

  concurrentTraverser(noWorkers: number, delay: number) {
    const graph = this;
    return {
      /**
       * This iterator yields job completions - including the letter of the 
       * job completed and the time at which it was completed in seconds
       **/    
      *[Symbol.iterator](): IterableIterator<[string, number]> {
        debugger;
        let workers = Worker.createWorkers(noWorkers);
        let availableJobs = graph.available;
        let clock = 0;

        while(availableJobs.length) {
          // assign available jobs to available workers
          let availableUnassigned = availableJobs.filter(job => !Worker.jobAssigned(workers, job));
          while(availableUnassigned.length && Worker.hasAvailable(workers)) {
            const job: string = availableUnassigned.shift() || '';
            const endTime: number = clock + delay + job.charCodeAt(0) - CHAR_OFFSET;
            const worker = Worker.assignNext(workers, job, endTime);
          }
          // tick to next completed job
          const nextCompletedWorker = Worker.nextToFinish(workers);
          clock = nextCompletedWorker.nextAvailable;
          // yield completion
          yield [nextCompletedWorker.job || '', clock];
          // remove completed job vertex
          graph.deleteVertex(nextCompletedWorker.job || '');
          // remove assignment from worker
          nextCompletedWorker.unassign();
          // recalculate available
          availableJobs = graph.available;
        }
      }
    }
  }
}

type AdjacencyList = Map<string, string[]>;
