import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const input = (await loadInput(5)).trim();
  console.log(`Day 5, part 1: ${solutionA(input)}`);
  console.log(`Day 5, part 2: ${solutionB(input)}`);
}

export function solutionA(input: string): number {
  return resolve(input).length;
}

export function solutionB(input: string): number {
  return Math.min(
    ...'abcdefghijklmnopqrstuvwxyz'
      .split('')
      .map((letter: string) => resolve(input.replace(new RegExp(letter, 'ig'), '')).length)
  );
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

export function resolve(polymer: string): string {
  let before: string = '';
  let after: string = polymer;
  while (before !== after) {
    before = after;
    after = trigger(before);
  }
  return after;
}
