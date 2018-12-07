import tape from 'tape';
import { solutionA } from './';

const input = [
  [1, 1],
  [1, 6],
  [8, 3],
  [3, 4],
  [5, 5],
  [8, 9],
];

tape('Day 6 part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 17);
});
