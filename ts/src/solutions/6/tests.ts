import tape from 'tape';
import { solutionA, findBounds, allPoints } from './';

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
  t.comment(solutionA(input));
  t.equal(solutionA(input), 17);
});

tape('Day 6 #findBounds', t => {
  t.plan(1);
  t.deepEqual(findBounds(input), [[1, 1], [8, 9]]);
})

tape('Day 6 #allPoints', t => {
  t.plan(1);
  t.deepEqual(allPoints([3, 4], [5, 5]), [
    [3, 4],
    [4, 4],
    [5, 4],
    [3, 5],
    [4, 5],
    [5, 5]
  ]);
})
