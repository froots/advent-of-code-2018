export async function solve(): Promise<void> {
  const input = 5153;
  console.time('part1');
  console.log(`Day 11, part 1: ${solutionA(input)}`);
  console.timeEnd('part1');
  console.time('part2');
  console.log(`Day 11, part 2: ${solutionB(input)}`);
  console.timeEnd('part2');
}

export function solutionA(serialNo: number): string {
  let g = grid(serialNo, 300, 300)
    .map(powerMapper)
    .map(sumMapper3);
  
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

export function solutionB(serialNo: number, size: number = 300): string {
  let g = grid(serialNo, size, size)
    .map(powerMapper);
  let summed = summedArea(g);
  let candidates: Candidate[] = [];

  summed.forEach((row: number[], y: number, cells: number[][]) => {
    row.forEach((sa: number, x: number) => {
      const maxSize = cells.length - Math.max(x, y);
      candidates.push({x: x + 1, y: y + 1, size: 1, total: cells[y][x]});
      for (let size = 2; size <= maxSize; size++) {
        let A = (x > 0 && y > 0) ? cells[y - 1][x - 1] : 0;
        let B = (y > 0) ? cells[y - 1][x + size - 1] : 0;
        let C = (x > 0) ? cells[y + size - 1][x - 1] : 0;
        let D = cells[y + size - 1][x + size - 1];
        let total = D + A - B - C;
        candidates.push({x: x + 1, y: y + 1, size, total});
      }
    });
  });

  const biggest: Candidate = candidates
    .reduce((max, candidate) => 
      (candidate.total > max.total) ? candidate : max,
      { x: -1, y: -1, size: 0, total: -Infinity }
    );

  return `${biggest.x},${biggest.y},${biggest.size}`;
}

function summedArea(g: number[][]): number[][] {
  let sa = grid(0, g.length, g.length);

  g.forEach((row: number[], y: number) => {
    row.forEach((cell: number, x: number) => {
      sa[y][x] = g[y][x] +
        (y > 0 ? sa[y - 1][x] : 0) +
        (x > 0 ? sa[y][x - 1] : 0) -
        (y > 0 && x > 0 ? sa[y - 1][x - 1] : 0);
    });
  });

  return sa;
}

function powerMapper(row: number[], y: number) {
  return row.map((cell, x) => cellPower(x + 1, y + 1, cell))
}

function sumMapper3(row: number[], y: number, cells: number[][]) {
  return row.map((cell, x) => sum(cells, 3, x, y));
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

type Candidate = {
  x: number,
  y: number,
  size: number,
  total: number
};
