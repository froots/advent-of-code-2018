import tape from 'tape';
import { solutionA, digitSum, CircularLinkedList, ListNode, step } from './';

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
  t.plan(12);
  let recipes = new CircularLinkedList(3, 7);
  let r1 = <ListNode>recipes.at(0);
  let r2 = <ListNode>recipes.at(1);

  [recipes, r1, r2] = step(recipes, r1, r2);
  t.deepEqual([...recipes], [3, 7, 1, 0], 'recipes1');
  t.equal(r1.data, 3);
  t.equal(r2.data, 7);
  [recipes, r1, r2] = step(recipes, r1, r2);
  t.deepEqual([...recipes], [3, 7, 1, 0, 1, 0], 'recipes2');
  t.equal(r1.data, 1);
  t.equal(r2.data, 0);
  [recipes, r1, r2] = step(recipes, r1, r2);
  t.deepEqual([...recipes], [3, 7, 1, 0, 1, 0, 1], 'recipes3');
  t.equal(r1.data, 1);
  t.equal(r2.data, 1);
  [recipes, r1, r2] = step(recipes, r1, r2);
  t.deepEqual([...recipes], [3, 7, 1, 0, 1, 0, 1, 2], 'recipes4');
  t.equal(r1.data, 3);
  t.equal(r2.data, 1);
});
