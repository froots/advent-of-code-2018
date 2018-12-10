export class Worker {
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
