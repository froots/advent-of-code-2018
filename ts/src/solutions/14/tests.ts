import tape from 'tape';
import { solutionA, digitSum, State, step } from './';

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

tape.only('Day 14 step', t => {
  t.plan(6);
  let state: State = {
    recipes: [3, 7],
    pointers: [0, 1]
  };
  state = step(state);
  t.deepEqual(state.recipes, [3, 7, 1, 0], 'recipes1');
  t.deepEqual(state.pointers, [0, 1], 'pointers1');
  state = step(state);
  t.deepEqual(state.recipes, [3, 7, 1, 0, 1, 0], 'recipes2');
  t.deepEqual(state.pointers, [4, 3], 'pointers2');
  state = step(state);
  t.deepEqual(state.recipes, [3, 7, 1, 0, 1, 0, 1], 'recipes3');
  t.deepEqual(state.pointers, [6, 4], 'pointers3');
});
