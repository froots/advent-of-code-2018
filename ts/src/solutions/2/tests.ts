import tape from 'tape';
import {
  countChars,
  hasExactCount,
  solutionA,
  pairs,
  sharedChars,
  solutionB
} from './';

tape('Day 2 #countsChars', t => {
  t.plan(3);
  let counts = countChars('aabcdd');
  t.equal(counts.get('a'), 2);
  t.equal(counts.get('b'), 1);
  t.equal(counts.get('d'), 2);
});

tape('Day 2 #hasExactCount', t => {
  t.plan(4);
  let counts = new Map();
  counts.set('a', 3);
  counts.set('b', 2);
  counts.set('c', 2);
  t.ok(hasExactCount(2, counts));
  t.ok(hasExactCount(3, counts));
  t.notOk(hasExactCount(4, counts));
  t.notOk(hasExactCount(0, counts));
});

tape('Day 2 solution part 1', t => {
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

tape('Day 2 #pairs', t => {
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

tape('Day 2 #sharedChars', t => {
  t.plan(5);
  t.equal(sharedChars('abc', 'def'), '');
  t.equal(sharedChars('abc', 'aef'), 'a');
  t.equal(sharedChars('abc', 'abc'), 'abc');
  t.equal(sharedChars('abc', 'acb'), 'a');
  t.equal(sharedChars('abc', 'cba'), 'b');
});

tape('Day 2 solution part 2', t => {
  t.plan(1);
  let inp = ['abcd', 'efgh', 'ijkl', 'abed', 'efmn', 'ijlk'];
  t.equal(solutionB(inp), 'abd');
});
