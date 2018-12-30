import { identity } from '../../identity';
import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const input = await loadInput(12);
  console.time('day12.1');
  console.log(`Day 12, part 1: ${solutionA(input)}`);
  console.timeEnd('day12.1');
  console.time('day12.2');
  console.log(`Day 12, part 2: ${solutionB(input)}`);
  console.timeEnd('day12.2');
}

export function solutionA(input: string): number {
  let [ pots, rules ] = parseInput(input);
  times(20, n => {
    pots.generation(rules);
  });
  return pots.sum();
}

export function solutionB(input: string): number {
  const GENERATIONS = 5000000000;
  let [ pots, rules ] = parseInput(input);

  let prev = 0;
  let sum = 0;
  let diff = 0;
  let history = [];

  for (let i = 0; i < GENERATIONS; i++) {
    pots.generation(rules);
    sum = pots.sum();
    diff = sum - prev;
    history.push(diff);
    if (history.length > 10) {
      history.shift();
      if (Math.min(...history) === Math.max(...history)) {
        let base = sum - (diff * i);
        return base + (GENERATIONS - 1) * diff;
      }
    }
    prev = sum;
  }
  
  return pots.sum(); // Won't ever get here
}

export function parseInput(input: string): [Pots, Rules] {
  let [potLine, ...ruleLines] = input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);

  return [
    new Pots(potLine.replace('initial state: ', '')),
    ruleLines.map(parseRule).filter(identity)
  ];
}

function parseRule(input: string): string {
  if (input.charAt(9) === '#') {
    return input.substring(0, 5);
  }
  return '';
}

function times(n: number, fn: (n: number) => any): void {
  [...Array(n).fill(0).keys()].forEach(n => fn(n));
}

class Pots {
  state: Set<number>;

  constructor(input: string) {
    this.state = new Set();
    let state = this.state;
    input
      .split('')
      .forEach((pot, i) => pot === '#' && state.add(i));
  }

  sortedValues(reversed: boolean = false): number[] {
    return [...this.state.values()].sort((a, b) => reversed ? b - a : a - b);
  }

  getBounds(): [number, number] {
    return [
      this.sortedValues()[0] - 2,
      this.sortedValues(true)[0] + 2
    ];
  }

  generation(rules: Rules): void {
    let newState = new Set(this.state);
    let [start, end] = this.getBounds();
    for (let i = start; i <= end; i++) {
      let pattern = this.patternAt(i);
      if (rules.includes(pattern)) {
        newState.add(i);
      } else {
        newState.delete(i);
      }
    }
    this.state = newState;
  }

  patternAt(idx: number) {
    let pattern = '';
    for (let i = idx - 2; i < idx + 3; i++) {
      pattern += (this.state.has(i) ? '#' : '.')
    }
    return pattern;
  }

  sum(): number {
    return this.sortedValues().reduce((sum, current) => sum + current, 0);
  }
}

type Rules = string[];
