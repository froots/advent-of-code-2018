import tape from 'tape';
import { solutionA, digitSum } from './';

tape('Day 14 Part 1', t => {
  t.plan(1);
  const actual = solutionA(9);
  const expected = 5158916779;
  t.equal(actual, expected, 'Day 14 part 1 solution');
});

tape('Day 14 digitSum', t => {
  t.plan(4);
  t.deepEqual(digitSum(9, 5), [1, 4]);
  t.deepEqual(digitSum(0, 1), [1]);
  t.deepEqual(digitSum(6, 4), [1, 0]);
  t.deepEqual(digitSum(2, 9), [1, 1]);
});
