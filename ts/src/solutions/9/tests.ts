import tape from 'tape';
import { solutionA, turn, startingState } from './';
import { DoublyLinkedList } from './DoublyLinkedList';

const input1: [number, number] = [9, 25];
const input2: [number, number] = [10, 1618];
const input3: [number, number] = [13, 7999];
const input4: [number, number] = [17, 1104];
const input5: [number, number] = [21, 6111];
const input6: [number, number] = [30, 5807];

tape.skip('Day 9 part 1', t => {
  t.plan(6);
  t.equal(solutionA(...input1), 32);
  t.equal(solutionA(...input2), 8317);
  t.equal(solutionA(...input3), 146373);
  t.equal(solutionA(...input4), 2764);
  t.equal(solutionA(...input5), 54718);
  t.equal(solutionA(...input6), 37305);
});

tape('Day 9 #turn', t => {
  t.plan(10);
  debugger;
  const start = startingState(9);
  const board = start.board;

  const turn1 = turn(start, 1);
  if (!board.firstNode || !board.lastNode) {
    t.fail('Empty nodes after turn');
    return false;
  }
  t.deepEqual(turn1.players, [0, 0, 0, 0, 0, 0, 0, 0, 0], 'First turn scores');
  t.equal(turn1.current.data, 1, 'First turn current value');
  t.equal(turn1.current.next, null, 'First turn current has no next');
  t.equal(turn1.current.prev, null, 'First turn current has no prev');

  t.equal(board.firstNode.data, 0, 'First turn board first node is 0');
  t.equal(board.lastNode.data, 0, 'First turn board last node is 0');

  const turn2 = turn(turn1, 2);
  t.deepEqual(turn2.players, [0, 0, 0, 0, 0, 0, 0, 0, 0], '2nd turn scores');
  t.equal(turn2.current.data, 2, '2nd turn current value');
  t.equal(board.firstNode.data, 1, '2nd turn first node value');
  t.equal(board.lastNode.data, 0, '2nd turn lsat node value');

  // const turn3 = turn(turn2, 3);
  // t.deepEqual(turn3.players, [0, 0, 0, 0, 0, 0, 0, 0, 0], '3rd turn scores');
  // t.equal(turn3.current.data, 3, '3rd turn current value');
  // t.deepEqual([...board.values()], [0, 2, 1]);

  // t.deepEqual(turn3, {
  //   players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   board: [0, 2, 1, 3],
  //   current: 3
  // });
  // const turn4 = turn(turn3, 4);
  // t.deepEqual(turn4, {
  //   players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   board: [0, 4, 2, 1, 3],
  //   current: 1
  // });
});
