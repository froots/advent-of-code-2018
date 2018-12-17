export async function solve(): Promise<void> {
  const input = 5153;
  console.log(`Day 11, part 1: ${solutionA(input)}`);
}

export function solutionA(serialNo: number): string {
  let g = grid(serialNo, 300, 300)
    .map((row, y) => row.map((cell, x) => cellPower(x + 1, y + 1, cell)))
    .map((row, y, cells) => row.map((cell, x) => sum(cells, 3, x, y)));
  
  let max = -Infinity;
  let maxX = -1;
  let maxY = -1;

  g.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (typeof cell === 'number' && cell > max) {
        max = cell;
        maxX = x;
        maxY = y;
      }
    });
  });

  return `${maxX + 1},${maxY + 1}`;
}

function sum(g: number[][], size: number, startX: number, startY: number) {
  let total = 0;
  for (let y = startY; y < startY + size; y++) {
    for (let x = startX; x < startX + size; x++) {
      if (g[y] && typeof g[y][x] === 'number') {
        total += g[y][x];
      } else {
        return 0;
      }
    }
  }
  return total;
}

function grid(serialNo: number, sizeX: number, sizeY: number): number[][] {
  return Array(sizeY).fill(undefined).map(_ => Array(sizeX).fill(serialNo));
}

export function cellPower(x: number, y: number, serial: number): number {
  const rackID: number = x + 10;
  let powerID: string = ((rackID * y + serial) * rackID).toString();
  let power: number = powerID.length >= 3 ?
    Number(powerID.charAt(powerID.length - 3)) :
    0;
  return power - 5;
}
