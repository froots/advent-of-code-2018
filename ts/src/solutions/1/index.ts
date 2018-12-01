import path from 'path';
import fs from 'fs';

async function loadInput(n: number): Promise<string> {
  const filePath: string = path.resolve('../../../inputs', n.toString());
  return await fs.promises.readFile(filePath, { encoding: 'utf8' });
}

async function solve(): Promise<void> {
  const input = parseInput(await loadInput(1));
  console.log(solutionA(input));
}

function parseInput(input: string): number[] {
  return input.split('\n').map(parseInt);
}

export function solutionA(frequencies: number[]): number {
  return frequencies.reduce(add, 0);
}

function add(a: number, b: number): number {
  return a + b;
}
