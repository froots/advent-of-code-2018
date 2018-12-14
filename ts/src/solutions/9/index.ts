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
  const board = new DoublyLinkedList();
  let state: GameState = startingState(noPlayers);
  for (let marble = 1; marble <= marbles; marble++) {
    state = turn(state, marble);
  }
  return 0;
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
  let newMarble = new DoublyLinkedNode(marble);
  // Add current to end
  state.board.insertEnd(state.current);
  // Switch first to end
  state.board.moveLastToFirst();
  return {
    players,
    board: state.board,
    current: newMarble
  };
}

type GameState = {
  players: number[],
  board: DoublyLinkedList,
  current: DoublyLinkedNode
};
