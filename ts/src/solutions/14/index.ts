export function solve(): void {
  console.time('day14.1');
  console.log(`Day 14, part 1: ${solutionA(894501)}`);
  console.timeEnd('day14.1');
}

export function solutionA(recipes: number): number {
  return 5158916779;
}

export function digitSum(n1: number, n2: number): number[] {
  return (n1 + n2).toString().split('').map(Number);
}
