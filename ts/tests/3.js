const test = require('tape');
const { solutionA, parseClaim, registerClaim } = require('../dist/solutions/3');

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

test('Day 3 #registerClaim', t => {
  t.plan(2);

  const claim1 = {
    id: 1,
    p1: [1, 2],
    p2: [2, 3]
  };
  const claim2 = {
    id: 2,
    p1: [0, 0],
    p2: [2, 2]
  };
  const initial = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const expected1 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0]];
  const expected2 = [[1, 1, 1, 0], [1, 1, 1, 0], [1, 2, 2, 0], [0, 1, 1, 0]];

  const actual1 = registerClaim(initial, claim1);
  const actual2 = registerClaim(actual1, claim2);

  t.deepEqual(actual1, expected1);
  t.deepEqual(actual2, expected2);
});
