const test = require('tape');
const { solutionA, parseClaim } = require('../dist/solutions/3');

test.skip('Day 3 part 1', t => {
  t.plan(1);
  const claims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
  t.equal(solutionA(claims), 4);
});

test('Day 3 #parseClaim', t => {
  t.plan(3);
  const claim = parseClaim('#154 @ 12,39: 52x32');
  t.equal(claim.id, 154);
  t.deepEqual(claim.p1, [12, 39]);
  t.deepEqual(claim.p2, [64, 71]);
});
