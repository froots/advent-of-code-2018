export async function solve(): Promise<void> {
  const input = 5153;
  console.log(`Day 11, part 1: ${solutionA(input)}`);
}

export function solutionA(serialNo: number): string {
  // Create grid
  const g = new Grid(serialNo);
  // Calculate power of each cell
  g.powerUp();
  // Find best 3x3 region
  return g.bestRegion().join(',');
}

export function cellPower(x: number, y: number, serial: number): number {
  const rackID: number = x + 10;
  let powerID: string = ((rackID * y + serial) * rackID).toString();
  let power: number = powerID.length >= 3 ?
    Number(powerID.charAt(powerID.length - 3)) :
    0;
  return power - 5;
}

export class Grid {
  serialNo: number;
  sizeX: number;
  sizeY: number;
  cells: number[][];

  constructor(serialNo: number, sizeX: number = 300, sizeY: number = 300) {
    this.serialNo = serialNo;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.cells = Array(sizeY).fill(undefined).map(row => Array(sizeX).fill(0));
  }

  powerUp(): void {
    this.cells = this.cells.map(
      (row: number[], y: number) => row.map(
        (cell: number, x: number) => cellPower(x + 1, y + 1, this.serialNo)
      )
    );
  }

  bestRegion(): Coord {
    let best: Coord = [0, 0];
    let max: number = -Infinity;
    const c = this.cells;
    for (let y = 0, yl = c.length - 2; y < yl; y++) {
      for (let x = 0, xl = c[y].length - 2; x < xl; x++) {
        const sum = c[y][x] + c[y][x+1] + c[y][x+2] +
          c[y+1][x] + c[y+1][x+1] + c[y+1][x+2] +
          c[y+2][x] + c[y+2][x+1] + c[y+2][x+2];
        if (sum > max) {
          max = sum;
          best = [x + 1, y + 1];
        }
      }
    }
    return best;
  }
}

type Coord = [number, number];
