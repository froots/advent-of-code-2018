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
  const nearestMap = points
    .map(point => [...point, getNearestCoord(coords, point)]);
  const perimeterPoints = nearestMap
    .filter(perimeterFilter);
  const perimeterCoords = perimeterPoints
    .map(([x, y, nearest]) => nearest)
    .filter(n => n >= 0)
    .filter((val, i, self) => self.indexOf(val) === i);
  const wipeInfinite = nearestMap
    .filter(([x, y, nearest]: number[]) =>
      perimeterCoords.indexOf(nearest) === -1 && 
      nearest >= 0
    );
  const areas = wipeInfinite
    .reduce((counts, [x, y, nearest]) => {
      counts.set(nearest, (counts.get(nearest) || 0) + 1);
      return counts;
    }, new Map())
    .values();

  function perimeterFilter([x, y, nearest]: number[]): boolean {
    return x === topLeft[0] ||
      x === bottomRight[0] ||
      y === topLeft[1] ||
      y === bottomRight[1];
  }

  return Math.max(...areas);
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


