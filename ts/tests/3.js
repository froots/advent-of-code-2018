const test = require('tape');
const { solutionA, parseClaim, registerClaim } = require('../dist/solutions/3');

test.skip('Day 3 part 1', t => {
  t.plan(1);
  const claims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
  t.equal(solutionA(claims), 4);
});

test('Day 3 #parseClaim', t => {
  t.plan(5);
  const claim = parseClaim('#154 @ 12,39: 52x32');
  t.equal(claim.id, 154);
  t.equal(claim.x1, 12);
  t.equal(claim.y1, 39);
  t.equal(claim.x2, 64);
  t.equal(claim.y2, 71);
});

test('Day 3 #registerClaim', t => {
  t.plan(2);

  const claim1 = {
    id: 1,
    x1: 1,
    y1: 2,
    x2: 2,
    y2: 3
  };
  const claim2 = {
    id: 2,
    x1: 0,
    y1: 0,
    x2: 2,
    y2: 2
  };
  const initial = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  const expected1 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0]];
  const expected2 = [[1, 1, 1, 0], [1, 1, 1, 0], [1, 2, 2, 0], [0, 1, 1, 0]];

  const actual1 = registerClaim(initial, claim1);
  const actual2 = registerClaim(actual1, claim2);

  t.deepEqual(actual1, expected1);
  t.deepEqual(actual2, expected2);
});
