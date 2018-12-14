import tape from 'tape';
import { solutionA } from './';

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
