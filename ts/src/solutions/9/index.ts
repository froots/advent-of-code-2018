import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const [noPlayers, marbles] = parseInput(await loadInput(9));
  console.time('part1');
  console.log(`Day 9, part 1 (attempt 2): ${solutionA(noPlayers, marbles)}`);
  console.timeEnd('part1');
}

function parseInput(input: string): number[] {
  const MATCHER = /(\d+) players; last marble is worth (\d+) points/;
  const matches = input.trim().match(MATCHER);
  if (!matches || !matches[1] || !matches[2]) {
    throw new Error('Could not parse input file');
  }
  return [Number(matches[1]), Number(matches[2])];
}

export function solutionA(noPlayers: number, marbles: number): number {

  return 0;
}
