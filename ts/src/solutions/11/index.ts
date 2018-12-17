export async function solve(): Promise<void> {
  const input = 5153;
  console.log(`Day 11, part 1: ${solutionA(input)}`);
}

export function solutionA(serialNo: number): Coord {
  return [0, 0];
}

export function cellPower(x: number, y: number, serial: number): number {
  const rackID: number = x + 10;
  let powerID: string = ((rackID * y + serial) * rackID).toString();
  let power: number = powerID.length >= 3 ?
    Number(powerID.charAt(powerID.length - 3)) :
    0;
  return power - 5;
}

type Coord = [number, number];
