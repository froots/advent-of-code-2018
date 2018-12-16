import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(10));
  console.log(`Day 10, part 1`);
  console.log(solutionA(input));
}

function parseInput(input: string): Point[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity)
    .map(parseLine);
}

export function parseLine(line: string): Point {
  const values = line.match(/-?\d+/g);
  if (!values || values.length !== 4) {
    throw new Error ('Could not parse line');
  }
  return point(
    vector(Number(values[0]), Number(values[1])),
    vector(Number(values[2]), Number(values[3]))
  );
}

export function solutionA(input: Point[]): string[] {
  // next: area, points
  let currentPoints = input;
  let currentArea = area(currentPoints);
  
  let nextPoints = tick(currentPoints);
  let nextArea = area(nextPoints);

  while (currentArea >= nextArea) {
    currentPoints = nextPoints;
    currentArea = nextArea;

    nextPoints = tick(currentPoints);
    nextArea = area(nextPoints);
  }

  return render(currentPoints);

}

export function render(points: Point[]): string[] {
  const positions = points.map(p => p.position);
  const [tl, br] = bounds(positions);
  let canvas: string[] = Array(height(tl, br))
    .fill('.'.repeat(width(tl, br)));
  positions.forEach(({x, y}) => {
    const s = canvas[y - tl.y];
    const i = x - tl.x;
    canvas[y - tl.y] = s.substr(0, i) + '#' + s.substr(i + 1);
  });
  return canvas;
}

export function tick(points: Point[]): Point[] {
  return points.map(tickPoint);
}

export function area(points: Point[]): number {
  const [tl, br]: [Vector, Vector] = 
    bounds(points.map(point => point.position));
  return (Math.abs(br.x - tl.x) + 1) * (Math.abs(br.y - tl.y) + 1);
}

export function bounds(positions: Vector[]): [Vector, Vector] {
  let topLeft = vector(
    Math.min(...positions.map(pos => pos.x)),
    Math.min(...positions.map(pos => pos.y))
  );
  let bottomRight = vector(
    Math.max(...positions.map(pos => pos.x)),
    Math.max(...positions.map(pos => pos.y))
  );
  return [ topLeft, bottomRight ];
}

export function vector(x: number, y: number): Vector {
  return { x, y };
}

function vAdd(v1: Vector, v2: Vector): Vector {
  return vector(
    v1.x + v2.x,
    v1.y + v2.y
  );
}

export function point(position: Vector, velocity: Vector): Point {
  return { position, velocity };
}

function tickPoint(p: Point): Point {
  return point(
    vAdd(p.position, p.velocity),
    p.velocity
  )
}

function width(tl: Vector, br: Vector): number {
  return br.x - tl.x + 1;
}

function height(tl: Vector, br: Vector): number {
  return br.y - tl.y + 1;
}

type Vector = {
  x: number,
  y: number
};

type Point = {
  position: Vector,
  velocity: Vector
};
