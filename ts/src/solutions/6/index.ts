import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(6));
  console.log(`Day 6, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(line => line.split(', ').map(Number));
}

export function solutionA(coords: number[][]) {
  const [topLeft, bottomRight] = findBounds(coords);
  const points = allPoints(topLeft, bottomRight);
  return points
    .map(point => [...point, getNearestCoord(coords, point)]);
}

export function getNearestCoord(coords: number[][], point: number[]): number {
  let distances = coords
    .map((coord, i) => [ i, manhattanDistance(coord, point) ])
    .sort(([i1, d1], [i2, d2]) => d1 - d2);
  if (distances.length > 1 && distances[0][1] === distances[1][1]) {
    return -1;
  }
  return distances[0][0];
}

export function manhattanDistance(
  [x1, y1]: number[],
  [x2, y2]: number[]
): number {
  return Math.abs(y2 - y1) + Math.abs(x2 - x1);
}

export function allPoints(
  [x1, y1]: number[],
  [x2, y2]: number[]
): number[][] {
  let points = [];
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      points.push([x, y]);
    }
  }
  return points;
}

export function findBounds(coords: number[][]): number[][] {
  return [
    [
      Math.min(...pluckIndex(coords, 0)),
      Math.min(...pluckIndex(coords, 1))
    ],
    [
      Math.max(...pluckIndex(coords, 0)),
      Math.max(...pluckIndex(coords, 1))
    ]
  ];
}

function pluckIndex(collection: any[][], idx: number) {
  return collection.map(inner => inner[idx]);
}


