import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(1));
  console.log(`Part 1: ${solutionA(input)}`);
  console.log(`Part 2: ${solutionB(input)}`);
}

function parseInput(input: string): number[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(Number);
}

function add(a: number, b: number): number {
  return a + b;
}

export function solutionA(frequencies: number[]): number {
  return frequencies.reduce(add, 0);
}

export function solutionB(frequencies: number[]): number {
  let total: number = 0;
  let values: Set<number> = new Set([total]);

  function findRepeatedFrequency(): number {
    for (let n of frequencies) {
      total += n;
      if (values.has(total)) {
        return total;
      }
      values.add(total);
    }
    return findRepeatedFrequency();
  }
 
  return findRepeatedFrequency();
}
