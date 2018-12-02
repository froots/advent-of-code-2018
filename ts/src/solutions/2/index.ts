import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(2));
  console.log(`Day 2, part 1: ${solutionA(input)}`);
  console.log(`Day 2, part 2: ${solutionB(input)}`);
}

function parseInput(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);
}

export function solutionA(ids: string[]): number {
  const [twos, threes] = ids
    // create a Map for each ID with character counts {'a': 2}
    .map(countChars)
    // Create a [bool, bool] array describing whether each row has an exact
    // count of 2 and 3 of the same character
    .map(counts => [ 
      hasExactCount(2, counts),
      hasExactCount(3, counts)
    ])
    // Convert the bool values to 0 or 1
    .map((a) => a.map(b => Number(b)))
    // Sum the values to one [sum_of_twos, sum_of_threes] array
    .reduce(sumArray, [0, 0])
  // Return the product
  return twos * threes;
}

export function solutionB(ids: string[]): string {
  // Create permutations
  const perms = pairs(ids);
  console.log(perms);
  // Map over permutations
  // If only one char diff, return identical chars
  return 'abcd';
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

function sumArray(a1: number[], a2: number[]): number[] {
  return a2.map((n, i) => (a1[i] || 0) + n);
}

export function pairs<T>(inp: T[]): T[][] {
  const [left, ...rest] = inp;
  if (!left || !rest || !rest.length) {
    return [];
  }
  const leftPairs = rest.map(right => [left, right]);
  return [...leftPairs, ...pairs(rest)];
}
