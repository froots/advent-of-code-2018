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

class Worker {
  job: string | null;
  nextAvailable: number;

  constructor(job: string | null = null, nextAvailable: number = 0) {
    this.job = job;
    this.nextAvailable = nextAvailable;
  }

  get available(): boolean {
    return this.job === null;
  }

  assign(job: string, endTime: number): Worker {
    this.job = job;
    this.nextAvailable = endTime;
    return this;
  }

  unassign(): Worker {
    this.job = null;
    return this;
  }

  static createWorkers(n: number): Worker[] {
    return Array(n)
      .fill(null)
      .map(w => new Worker());
  }

  static allAvailable(workers: Worker[]): Worker[] {
    return workers.filter(worker => worker.available);
  }

  static allAssigned(workers: Worker[]): Worker[] {
    return workers.filter(worker => !worker.available);
  }

  static nextAvailable(workers: Worker[]): Worker | null {
    const all = Worker.allAvailable(workers);
    if (all && all.length) {
      return all[0];
    }
    return null;
  }

  static hasAvailable(workers: Worker[]): boolean {
    return Worker.allAvailable(workers).length > 0;
  }

  static assignNext(workers: Worker[], job: string, endTime: number): Worker | boolean { 
    const worker = Worker.nextAvailable(workers);
    if (worker) {
      return worker.assign(job, endTime);
    }
    return false;
  }

  static nextToFinish(workers: Worker[]): Worker {
    return [...Worker.allAssigned(workers)]
      .sort((w1, w2) => w1.nextAvailable - w2.nextAvailable)[0];
  }

  static jobAssigned(workers: Worker[], job: string): boolean {
    return Worker.allAssigned(workers).map(worker => worker.job).includes(job);
  }
}
