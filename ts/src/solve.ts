import { solutions } from './solutions';
import { Solver } from './types/Solver';

function run(n: number): void {
  const solver: Solver = solutions[n];
  console.log(solver());
}

const [, , day]: string[] = process.argv;

let sol: number = Number(day) - 1;

run(sol);
