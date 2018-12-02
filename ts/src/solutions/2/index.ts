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
  // map to interpreter
  return ids.length;
}

function characterCounter(
  counts: Map<string, number>,
  ch: string
): Map<string, number> {
  counts.set(ch, (counts.get(ch) || 0) + 1);
  return counts;
}

export function exactlyTwoOfAnyLetter(id: string): boolean {
  let counts: Map<string, number> = id
    .split('')
    .reduce(characterCounter, new Map());
  return [...counts.values()].some((count: number) => count === 2)
}

export function exactlyThreeOfAnyLetter(id: string): boolean {
  return true;
}
