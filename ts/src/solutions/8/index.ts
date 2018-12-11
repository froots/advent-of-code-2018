import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(8));
  console.log(`Day 8, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): number[] {
  return input
    .trim()
    .split(' ')
    .map(Number);
}

export function solutionA(input: number[]): number {
  let [root] = parseNode(input);
  return sumMetadata(root);
}

export function parseNode(
  [childCount, metaCount, ...rest]: number[]
): [Node, number[]] {
  let node: Node = {
    children: [],
    metadata: []
  };

  let remaining = rest;

  for (let i = 0; i < childCount; i++) {
    let child;
    [child, remaining] = parseNode(remaining);
    node.children = [...node.children, child];
  }

  node.metadata = remaining.slice(0, metaCount);
  remaining = remaining.slice(metaCount);

  return [node, remaining];
}

export function sumMetadata(node: Node): number {
  const thisSum = node.metadata.reduce(
    (sum: number, data: number) => sum + data,
    0
  );
  const childrenSum = node.children.reduce(
    (sum: number, child: Node) => sum + sumMetadata(child),
    0
  );
  return thisSum + childrenSum;
}

type Node = {
  children: Node[];
  metadata: number[]
}
