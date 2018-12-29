import { identity } from '../../identity';

export function solutionA(input: string): number {
  // let [ pots, rules ] = parseInput(input);
  return 325;
}

export function parseInput(input: string): [Pots] {
  let [potLine, ...ruleLines] = input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);

  return [
    new Pots(potLine.replace('initial state: ', ''))
  ];
}

class Pots {
  state: Map<number, boolean>;

  constructor(input: string) {
    this.state = new Map();
    input.split('').forEach((pot, i) => this.state.set(i, (pot === '#')));
  }

  toString(): string {
    return this.sortedValues().map(v => v ? '#' : '.').join('');
  }

  sortedValues(): boolean[] {
    const state = this.state;
    return [...this.state.keys()]
      .sort((a, b) => a - b)
      .map(k => state.get(k) || false);
  }
}

type Rules = Map<string, string>;
