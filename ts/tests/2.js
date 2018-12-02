const test = require('tape');
const {
  countChars,
  hasExactCount,
  sumBoolArray
} = require('../dist/solutions/2');

test('Counts characters in a string', t => {
  t.plan(3);
  let counts = countChars('aabcdd');
  t.equal(counts.get('a'), 2);
  t.equal(counts.get('b'), 1);
  t.equal(counts.get('d'), 2);
});

test('Has exact count', t => {
  t.plan(4);
  let counts = new Map();
  counts.set('a', 3);
  counts.set('b', 2);
  counts.set('c');
  t.ok(hasExactCount(2, counts));
  t.ok(hasExactCount(3, counts));
  t.notOk(hasExactCount(4, counts));
  t.notOk(hasExactCount(0, counts));
});

test('Sums array of booleans', t => {
  t.plan(1);
  let arr = [
    [true, false],
    [false, false],
    [true, true],
    [false, true],
    [false, true]
  ];
  t.deepEqual(sumBoolArray(arr), [2, 3]);
});
