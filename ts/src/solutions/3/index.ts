import { loadInput } from '../../loadInput';
import { identity } from '../../identity';

export async function solve(): Promise<void> {
  const input = parseInput(await loadInput(3));
  console.log(`Day 3, part 1: ${solutionA(input, 1000, 1000)}`);
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
export function solutionA(input: string[], w: number, h: number): number {
  const initialClaimMap: ClaimMap = Array(h)
    .fill([])
    .map(row => Array(w).fill(0));

  const registeredClaimMap = input
    .map(parseClaim)
    .reduce(countClaim, initialClaimMap);

  return conflictCount(registeredClaimMap);
}

/**
 * Takes a string in the form `#1 @ 1,3: 4x4` and converts to a Claim instance
 * @param notation - Notation in the form `#1 @ 1,3: 4x4`, donating ID & coords
 * @returns a Claim instance corresponding to the notation
 */
export function parseClaim(notation: string): Claim {
  const claimExpression = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
  const matches: RegExpMatchArray | null = notation.match(claimExpression);
  if (matches) {
    const [_, id, x, y, w, h] = matches;
    return {
      id: Number(id),
      x1: Number(x),
      y1: Number(y),
      x2: Number(x) + Number(w) - 1,
      y2: Number(y) + Number(h) - 1
    };
  }
  throw new Error('Could not parse claim');
}

/**
 * A reducer that takes a claim and returns and updated 2x2 map of claims 
 * covering all coordinates
 * @param claimMap - Tracks the count of claims covering each coordinate
 * @param claim - The current claim to register
 */
export function countClaim(claimMap: ClaimMap, claim: Claim): ClaimMap {
  const newClaimMap = [...claimMap.map(i => [...i])];
  for (let y = claim.y1; y <= claim.y2; y++) {
    for (let x = claim.x1; x <= claim.x2; x++) {
      newClaimMap[y][x]++;
    }
  }
  return newClaimMap;
}

export function conflictCount(claimMap: ClaimMap): number {
  let countArr: number[] = [];
  return countArr.concat(...claimMap)
    .filter(count => count > 1)
    .length;
}

type Claim = {
  id: number;
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

type ClaimMap = number[][];
