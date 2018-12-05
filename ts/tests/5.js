const test = require('tape');
const { solutionA, trigger } = require('../dist/solutions/5');

test('Day 5 part 1', t => {
  t.plan(1);
  const input = 'dabAcCaCBAcCcaDA';
  t.equal(solutionA(input), 10);
});

test('Day 5 trigger', t => {
  t.plan(5);
  t.equal(trigger('aA'), '');
  t.equal(trigger('abBA'), 'aA');
  t.equal(trigger('abAB'), 'abAB');
  t.equal(trigger('aabAAB'), 'aabAAB');
  t.equal(trigger('dabAcCaCBAcCcaDA'), 'dabAcCaCBAcaDA');
});
