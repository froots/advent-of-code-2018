import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(1));
  console.log(`Day 2, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);
}

export function solutionA(ids: string[]): number {
  // Map each line to counts Map
  // Map each line to array of [bool, bool] (2 letter, 3 letter groups present)
  // reduce to single array [number, number] with counts of each
  // return product of these

  // const [twos, threes] = ids // string[]
  //   .map(countChars) // Map<string, number>[]
  //   .map(counts => [
  //     hasExactCount(2, counts),
  //     hasExactCount(3, counts)
  //   ]) // boolean[][]
  //   .reduce(sumBoolArray, [0, 0])
  // return twos * threes;

  return ids.length;
}

export function countChars(inp: string): Map<string, number> {
  return inp
    .split('')
    .reduce(characterCounter, new Map());
}

function characterCounter(
  counts: Map<string, number>,
  ch: string
): Map<string, number> {
  counts.set(ch, (counts.get(ch) || 0) + 1);
  return counts;
}

export function hasExactCount(n: number, counts: Map<string, number>): boolean {
  return [...counts.values()].some((count: number) => count === n);
}

export function sumBoolArray(arr: boolean[][]): number[] {
  return arr
    .map(vals => vals.map(v => Number(v)))
    .reduce(arraySum, []);
}

function arraySum(a1: number[], a2: number[]): number[] {
  return a2.map((n, i) => (a1[i] || 0) + n);
} 
