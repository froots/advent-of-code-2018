import { identity } from '../../identity';

export function solutionA(input: string): number {
  let [ pots, rules ] = parseInput(input);
  return 325;
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

type Rules = string[];
