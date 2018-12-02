const test = require('tape');
const {
  countChars,
  hasExactCount,
  solutionA,
  pairs,
  solutionB
} = require('../dist/solutions/2');

test('Day 2 #countsChars', t => {
  t.plan(3);
  let counts = countChars('aabcdd');
  t.equal(counts.get('a'), 2);
  t.equal(counts.get('b'), 1);
  t.equal(counts.get('d'), 2);
});

test('Day 2 #hasExactCount', t => {
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

test('Day 2 solution part 1', t => {
  t.plan(1);
  let ids = [
    'abcdef', // false, false
    'bababc', // true, true
    'abbcde', // true, false
    'abcccd', // false, true
    'aabcdd', // true, false
    'abcdee', // true, false
    'ababab' // false, true
  ]; // total =  4,    3 = product of 12
  t.equal(solutionA(ids), 12);
});

test('Day 2 #pairs', t => {
  t.plan(1);
  let inp = ['a', 'b', 'c', 'd'];
  let expected = [
    ['a', 'b'],
    ['a', 'c'],
    ['a', 'd'],
    ['b', 'c'],
    ['b', 'd'],
    ['c', 'd']
  ];
  t.deepEqual(pairs(inp), expected);
});

// test('Day 2 solution part 2', t => {
//   t.plan(1);
//   let inp = ['abcd', 'efgh', 'ijkl', 'abed', 'efmn', 'ijlk'];
//   t.equal(solutionB(inp), 'abd');
// });
