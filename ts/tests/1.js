const test = require('tape');
const { solutionA, solutionB } = require('../dist/solutions/1');

test('Day 1A', t => {
  t.plan(2);
  t.equal(solutionA([1, -5, 7]), 3);
  t.equal(solutionA([-19, -12, -11, 16]), -26);
});

test('Day 1B', t => {
  t.plan(4);
  t.equal(solutionB([1, -1]), 0);
  t.equal(solutionB([3, 3, 4, -2, -4]), 10);
  t.equal(solutionB([-6, 3, 8, 5, -6]), 5);
  t.equal(solutionB([7, 7, -2, -7, -4]), 14);
});
