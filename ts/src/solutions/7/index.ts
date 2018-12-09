import { loadInput } from '../../loadInput';
import { identity } from '../../identity';
import { Graph } from './Graph';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(7));
  console.log(`Day 7, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): [string, string][] {
  const matcher = /Step ([a-zA-Z]) must be finished before step ([a-zA-Z]) can begin\./;
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(line => {
      const matches = line.match(matcher);
      return <[string, string]>[
        matches && matches[1] || '',
        matches && matches[2] || ''
      ];
    });
}

export function solutionA(links: [string, string][]): string {
  const graph = new Graph(links);
  return [...graph.serialTraverser()].join('');
}
