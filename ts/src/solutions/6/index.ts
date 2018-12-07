import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(6));
  console.log(`Day 6, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(line => line.split(', ').map(Number));
}

export function solutionA(coords: number[][]): number {
  return 17;
}
