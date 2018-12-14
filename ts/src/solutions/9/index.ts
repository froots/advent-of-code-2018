import { loadInput } from '../../loadInput';
import { DoublyLinkedList } from './DoublyLinkedList';
import { DoublyLinkedNode } from './DoublyLinkedNode';

export async function solve(): Promise<void> {
  const [noPlayers, marbles] = parseInput(await loadInput(9));
  console.time('part1');
  console.log(`Day 9, part 1 (attempt 2): ${solutionA(noPlayers, marbles)}`);
  console.timeEnd('part1');
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
  let state: GameState = startingState(noPlayers);
  for (let marble = 1; marble <= marbles; marble++) {
    state = turn(state, marble);
  }
  return Math.max(...state.players);
}

export function startingState(noPlayers: number): GameState {
  return {
    players: Array(noPlayers).fill(0),
    board: new DoublyLinkedList(),
    current: new DoublyLinkedNode(0)
  };
}

export function turn(state: GameState, marble: number): GameState {
  let players = [...state.players];
  let current = state.current;

  if (marble % 23 === 0) {
    let player = (marble - 1) % players.length;
    players[player] += marble
    let removed = state.board.rotate(-7, state.current);
    if (removed) {
      players[player] += removed.data;  
    }
    if (state.board.firstNode) {
      current = state.board.remove(state.board.firstNode);
    }
  } else {
    current = new DoublyLinkedNode(marble);
    state.board.insertEnd(state.current);
    state.board.moveFirstToLast();
  }

  return {
    players,
    board: state.board,
    current
  };
}

export type GameState = {
  players: number[],
  board: DoublyLinkedList,
  current: DoublyLinkedNode
};
