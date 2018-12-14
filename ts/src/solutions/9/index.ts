import { loadInput } from '../../loadInput';

export async function solve(): Promise<void> {
  const [noPlayers, marbles] = parseInput(await loadInput(9));
  console.time('part1');
  console.log(`Day 9, part 1: ${solutionA(noPlayers, marbles)}`);
  console.timeEnd('part1');
  console.time('part2');
  console.log(`Day 9, part 2: ${solutionA(noPlayers, 100 * marbles)}`);
  console.timeEnd('part2');
}

function parseInput(input: string): number[] {
  const MATCHER = /(\d+) players; last marble is worth (\d+) points/;
  const matches = input.trim().match(MATCHER);
  if (!matches || !matches[1] || !matches[2]) {
    throw new Error('Could not parse input file');
  }
  return [Number(matches[1]), Number(matches[2])];
}

export function solutionA(noPlayers: number, marbles: number): number {
  let state: GameState = {
    players: Array(noPlayers).fill(0),
    board: [0],
    current: 0
  };
  for (let marble = 1; marble <= marbles; marble++) {
    state = turn(state, marble);
  }
  return Math.max(...state.players);
}

export function turn(state: GameState, marble: number) {
  let players = [...state.players];
  let board = [...state.board];
  let current = state.current;
  let idx: number;
  // Special case for divisible by 23
  if (marble % 23 === 0) {
    // add current marble to score
    const player = (marble - 1) % players.length;
    players[player] += marble;
    // remove marble 7 counter-clockwise and add to score
    idx = (current - 7) % board.length;
    if (idx < 0) {
      idx += board.length;
    }
    const [removed] = board.splice(idx, 1);
    players[player] += removed;
    // if (idx >= board.length) {
    //   idx -= board.length;
    // }
  } else {
    idx = (state.current + 1) % board.length + 1;
    // if (idx > board.length) {
    //   idx -= board.length;
    // }
    board = [...board.slice(0, idx), marble, ...board.slice(idx)];
  }
  
  return {
    players,
    board,
    current: idx
  };
}

type GameState = {
  players: number[],
  board: number[],
  current: number
};
