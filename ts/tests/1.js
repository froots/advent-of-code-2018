const test = require('tape');
const { solutionA } = require('../dist/solutions/1');

test('Day 1A', t => {
  t.plan(2);
  t.equal(solutionA([1, -5, 7]), 3);
  t.equal(solutionA([-19, -12, -11, 16]), -26);
});
