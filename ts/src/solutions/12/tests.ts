import tape from 'tape';
import { input } from './testInput';
import { solutionA, parseInput } from './';

tape.skip('Day 12 Part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 325);
});

tape('Day 12 parseInput pots', t => {
  t.plan(1);
  let [ pots ] = parseInput(input);
  t.deepEqual(pots.state, [0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24]);
});

tape('day 12 parseInput rules', t => {
  t.plan(2);
  let [_, rules] = parseInput(input);
  t.ok(rules.includes('...##'));
  t.equal(rules.length, 14);
});

// tape('Day 12 generation', t => {
//   t.plan(1);
//   let [ pots, rules ] = parseInput(input);
//   pots.generation(rules);
//   t.equal(pots.toString(), '#...#....#.....#..#..#..#');
// });
