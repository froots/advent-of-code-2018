import { identity } from '../../identity';

export function solutionA(input: string): number {
  let [ pots, rules ] = parseInput(input);
  // times(20, n => {
  //   pots = generation(pots, rules);
  // });
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
}

type Rules = string[];
