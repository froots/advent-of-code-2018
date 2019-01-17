import tape from 'tape';
import { solutionA, digitSum, State, CircularLinkedList, step } from './';

tape('Day 14 Part 1', t => {
  t.plan(4);
  t.equal(solutionA(9), '5158916779', 'Day 14 part 1 example 1');
  t.equal(solutionA(5), '0124515891', 'Day 14 part 1 example 2');
  t.equal(solutionA(18), '9251071085', 'Day 14 part 1 example 3');
  t.equal(solutionA(2018), '5941429882', 'Day 14 part 1 example 4');
});

tape('Day 14 digitSum', t => {
  t.plan(4);
  t.deepEqual(digitSum(9, 5), [1, 4]);
  t.deepEqual(digitSum(0, 1), [1]);
  t.deepEqual(digitSum(6, 4), [1, 0]);
  t.deepEqual(digitSum(2, 9), [1, 1]);
});

tape('Day 14 step', t => {
  t.plan(8);
  let state: State = {
    recipes: new CircularLinkedList(3, 7),
    pointers: [0, 1]
  };
  state = step(state);
  t.deepEqual([...state.recipes], [3, 7, 1, 0], 'recipes1');
  t.deepEqual(state.pointers, [0, 1], 'pointers1');
  state = step(state);
  t.deepEqual([...state.recipes], [3, 7, 1, 0, 1, 0], 'recipes2');
  t.deepEqual(state.pointers, [4, 3], 'pointers2');
  state = step(state);
  t.deepEqual([...state.recipes], [3, 7, 1, 0, 1, 0, 1], 'recipes3');
  t.deepEqual(state.pointers, [6, 4], 'pointers3');
  state = step(state);
  t.deepEqual([...state.recipes], [3, 7, 1, 0, 1, 0, 1, 2], 'recipes4');
  t.deepEqual(state.pointers, [0, 6], 'pointers4');
});
