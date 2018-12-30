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
  state: number[];

  constructor(input: string) {
    this.state = input
      .split('')
      .map((pot, i) => pot === '#' ? i : -1)
      .filter(pot => pot >= 0);
  }
}

type Rules = string[];
