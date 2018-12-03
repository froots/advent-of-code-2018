import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(3));
  console.log(`Day 3, part 1: ${solutionA(input)}`);
}

function parseInput(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(identity);
}

/**
 * Calculates the count of square inches with at least 2 claims
 * @param input - Claims to examine in notational form
 * @returns Count of square inches
 */
export function solutionA(input: string[]): number {
  // Map -> parse claims
  // Reduce -> registerClaim
  // Flatten
  // Filter -> (> 1)
  // length
  return 0;
}

/**
 * Takes a string in the form `#1 @ 1,3: 4x4` and converts to a Claim instance
 * @param notation - Notation in the form `#1 @ 1,3: 4x4`, donating ID & coords
 * @returns a Claim instance corresponding to the notation
 */
export function parseClaim(notation: string): Claim | null {
  const claimExpression = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const matches: RegExpMatchArray | null = notation.match(claimExpression);
  if (matches) {
    const [_, id, x, y, w, h] = matches;
    return new Claim(Number(id), Number(x), Number(y), Number(w), Number(h));
  }
  return null;
}

/**
 * A reducer that takes a claim and returns and updated 2x2 map of claims 
 * covering all coordinates
 * @param claimMap - Tracks the count of claims covering each coordinate
 * @param claim - The current claim to register
 */
export function registerClaim(claimMap: ClaimMap, claim: Claim): ClaimMap {
  return [[0]];
}

class Claim {
  id: number;
  p1: Vector;
  p2: Vector;

  constructor(id: number, x: number, y: number, w: number, h: number) {
    this.id = id;
    this.p1 = [x, y];
    this.p2 = [x + w, y + h];
  }
}

type Vector = [number, number];
type ClaimMap = number[][];

