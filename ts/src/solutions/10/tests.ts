import tape from 'tape';
import { solutionA, parseLine, area, bounds, vector, point, tick, render } from './';
import { input } from './test-input';

tape('Day 10 #parseLine', t => {
  t.plan(4);
  const point1 = parseLine(input[1]);
  t.equal(point1.position.x, 7);
  t.equal(point1.position.y, 0);
  t.equal(point1.velocity.x, -1);
  t.equal(point1.velocity.y, 0);
});

tape('Day 10 part 1', t => {
  t.plan(1);
  const inp = input.map(parseLine);
  t.deepEqual(solutionA(inp), [
    '#...#..###',
    '#...#...#.',
    '#...#...#.',
    '#####...#.',
    '#...#...#.',
    '#...#...#.',
    '#...#...#.',
    '#...#..###'
  ]);
});

tape('Day 10 #area', t => {
  t.plan(1);
  const inp = input.map(parseLine);
  t.equal(area(inp), 22 * 16);
});

tape('Day 10 #bounds', t => {
  t.plan(4);
  const inp = [
    vector(5, 7),
    vector(2, 4),
    vector(-1, 9),
    vector(4, 10)
  ];
  const [topLeft, bottomRight] = bounds(inp);
  t.equal(topLeft.x, -1);
  t.equal(topLeft.y, 4);
  t.equal(bottomRight.x, 5);
  t.equal(bottomRight.y, 10);
});

tape('Day 10 #tick', t => {
  t.plan(6);
  const inp = [
    point(vector(5, 7), vector(-1, 3)),
    point(vector(2, 2), vector(2, 1)),
    point(vector(-4, 0), vector(0, -2))
  ];
  const next = tick(inp);
  t.equal(next[0].position.x, 4);
  t.equal(next[0].position.y, 10);
  t.equal(next[1].position.x, 4);
  t.equal(next[1].position.y, 3);
  t.equal(next[2].position.x, -4);
  t.equal(next[2].position.y, -2);
});

tape('Day 10 #render', t => {
  t.plan(1);
  const inp = [
    point(vector(1, 3), vector(0, 0)),
    point(vector(-1, 2), vector(0, 0)),
    point(vector(2, 2), vector(0, 0))
  ];
  const actual = render(inp);
  const expected = [
    '#..#',
    '..#.'
  ];
  t.deepEqual(actual, expected, 'Rendered correctly');
})
