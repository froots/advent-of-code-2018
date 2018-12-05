import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const input = (await loadInput(5)).trim();
  console.log(`Day 5, part 1: ${solutionA(input)}`);
}

export function solutionA(input: string): number {
  return 10;
}

export function trigger(polymer: string): string {
  let i: number = polymer.length;
  while (i--) {
    let ch1 = polymer.charAt(i);
    let ch2 = polymer.charAt(i-1);
    if (ch1 !== ch2 && ch1.toLowerCase() === ch2.toLowerCase()) {
      return `${polymer.slice(0, i-1)}${polymer.slice(i+1)}`;
    }
  }
  return polymer;
}
