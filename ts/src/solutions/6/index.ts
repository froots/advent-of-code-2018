import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(6));
  console.log(`Day 6, part 1: ${solutionA(input)}`);
  console.log(`Day 6, part 2: ${solutionB(input, 10000)}`);
}

function parseInput(input: string): number[][] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(line => line.split(', ').map(Number));
}

export function solutionA(coords: number[][]) {
  const [tl, br] = findBounds(coords);
  const nearestMap = allPoints(tl, br)
    .map(point => [...point, getNearestCoord(coords, point)]);
  const perimeterCoords = nearestMap
    .filter(([x, y]) => x === tl[0] || x === br[0] || y === tl[1] || y === br[1])
    .map(([x, y, nearest]) => nearest)
    .filter(n => n >= 0)
    .filter((val, i, self) => self.indexOf(val) === i);
  
  return Math.max(...nearestMap
    .filter(([x, y, nearest]: number[]) =>
      perimeterCoords.indexOf(nearest) === -1 && 
      nearest >= 0
    )
    .reduce((counts, [x, y, nearest]) => {
      counts.set(nearest, (counts.get(nearest) || 0) + 1);
      return counts;
    }, new Map())
    .values());
}

export function solutionB(coords: number[][], maxTotal: number): number {
  const [tl, br] = findBounds(coords);
  return allPoints(tl, br)
    .map(point => coords
      .map((coord) => manhattanDistance(point, coord))
      .reduce((sum, distance) => distance + sum, 0)
    )
    .filter(total => total < maxTotal)
    .length;
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
  const xs = coords.map(c => c[0]);
  const ys = coords.map(c => c[1]);
  return [
    [ Math.min(...xs), Math.min(...ys) ],
    [ Math.max(...xs), Math.max(...ys) ]
  ];
}
