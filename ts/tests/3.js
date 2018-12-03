const test = require('tape');
const {
  solutionA,
  solutionB,
  parseClaim,
  countClaim,
  conflictCount
} = require('../dist/solutions/3');

test('Day 3 part 1', t => {
  t.plan(1);
  const claims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
  t.equal(solutionA(claims, 8, 8), 4);
});

test('Day 3 #parseClaim', t => {
  t.plan(5);
  const claim = parseClaim('#154 @ 12,39: 52x32');
  t.equal(claim.id, 154);
  t.equal(claim.x1, 12);
  t.equal(claim.y1, 39);
  t.equal(claim.x2, 63);
  t.equal(claim.y2, 70);
});

test('Day 3 #countClaim', t => {
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

  const actual1 = countClaim(initial, claim1);
  const actual2 = countClaim(actual1, claim2);

  t.deepEqual(actual1, expected1);
  t.deepEqual(actual2, expected2);
});

test('Day 3 #conflictCount', t => {
  t.plan(1);
  const claimMap = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 2, 2, 1, 1, 0],
    [0, 1, 1, 2, 2, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];
  t.equal(conflictCount(claimMap), 4);
});

test('Day 3 part 2', t => {
  t.plan(1);
  const claims = ['#1 @ 1,3: 4x4', '#2 @ 3,1: 4x4', '#3 @ 5,5: 2x2'];
  t.equal(solutionB(claims, 8, 8), 3);
});
