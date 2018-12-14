import tape from 'tape';
import { solutionA, turn } from './';

const input1: [number, number] = [9, 25];
const input2: [number, number] = [10, 1618];
const input3: [number, number] = [13, 7999];
const input4: [number, number] = [17, 1104];
const input5: [number, number] = [21, 6111];
const input6: [number, number] = [30, 5807];

tape.only('Day 9 part 1', t => {
  t.plan(6);
  t.equal(solutionA(...input1), 32);
  t.equal(solutionA(...input2), 8317);
  t.equal(solutionA(...input3), 146373);
  t.equal(solutionA(...input4), 2764);
  t.equal(solutionA(...input5), 54718);
  t.equal(solutionA(...input6), 37305);
});

tape('Day 9 #turn', t => {
  t.plan(4);
  const start = {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0],
    current: 0
  };
  const turn1 = turn(start, 1);
  t.deepEqual(turn1, {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 1],
    current: 1
  });
  const turn2 = turn(turn1, 2);
  t.deepEqual(turn2, {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 2, 1],
    current: 1
  });
  const turn3 = turn(turn2, 3);
  t.deepEqual(turn3, {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 2, 1, 3],
    current: 3
  });
  const turn4 = turn(turn3, 4);
  t.deepEqual(turn4, {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 4, 2, 1, 3],
    current: 1
  });
});

tape('Day 9 #turn - 23 case', t => {
  t.plan(1);
  const start = {
    players: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    board: [0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
    current: 13
  };
  t.deepEqual(turn(start, 23), {
    players: [0, 0, 0, 0, 32, 0, 0, 0, 0],
    board: [0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15],
    current: 6
  });
});
