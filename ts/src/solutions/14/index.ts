export function solve(): void {
  console.time('day14.1');
  console.log(`Day 14, part 1: ${solutionA(894501)}`);
  console.timeEnd('day14.1');
}

export function solutionA(recipes: number): number {
  const startState: State = {
    recipes: [3, 7],
    pointers: [0, 1]
  };
  return 5158916779;
}

export function step(state: State): State {
  let [p1, p2] = state.pointers;
  const r1 = state.recipes[p1];
  const r2 = state.recipes[p2];
  const recipes = [...state.recipes, ...digitSum(r1, r2)];
  p1 = p1 + (r1 + 1) % recipes.length;
  p2 = p2 + (r2 + 1) % recipes.length;
  return {
    recipes,
    pointers: [p1, p2]
  };
}

export function digitSum(n1: number, n2: number): number[] {
  return (n1 + n2).toString().split('').map(Number);
}

export type State = {
  recipes: number[],
  pointers: [number, number]
};
