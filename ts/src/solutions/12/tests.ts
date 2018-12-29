import tape from 'tape';
import { input } from './testInput';
import { solutionA, parseInput } from './';

tape('Day 12 Part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 325);
});

tape('Day 12 parseInput pots', t => {
  t.plan(1);
  let [ pots ] = parseInput(input);
  t.equal(pots.toString(), '#..#.#..##......###...###');
});

tape('day 12 parseInput rules', t => {
  t.plan(2);
  let [_, rules] = parseInput(input);
  t.ok(rules.includes('...##'));
  t.equal(rules.length, 14);
});
