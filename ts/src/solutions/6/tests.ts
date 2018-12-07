import tape from 'tape';
import {
  solutionA,
  findBounds,
  allPoints,
  getNearestCoord,
  manhattanDistance
} from './';

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

tape('Day 6 #getNearestCoord', t => {
  t.plan(4);
  t.equal(getNearestCoord(input, [2, 1]), 0, 'First coord');
  t.equal(getNearestCoord(input, [4, 1]), 0, 'First coord');
  t.equal(getNearestCoord(input, [5, 1]), -1, 'No match');
  t.equal(getNearestCoord(input, [2, 5]), -1, 'No match');
});

tape('Day 6 #manhattanDistance', t => {
  t.plan(2);
  t.equal(manhattanDistance(input[0], input[1]), 5);
  t.equal(manhattanDistance(input[2], input[1]), 10);
})
