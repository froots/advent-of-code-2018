import tape from 'tape';
import { solutionA } from './';

tape('Day 11 part 1', t => {
  t.plan(2);
  t.equal(solutionA(18), '33,45');
  t.equal(solutionA(42), '21,61');
});

// tape('Day 11 #cellPower', t => {
//   t.plan(3);
//   t.equal(cellPower(3, 5, 8), 4);
//   t.equal(cellPower(122, 79, 57), -5);
//   t.equal(cellPower(101, 153, 71), 4);
// });

// tape('Day 11 #Grid constructor', t => {
//   t.plan(2);
//   const g = new Grid(18);
//   t.equal(g.cells.length, 300);
//   t.equal(g.cells[0].length, 300);
// });

// tape('Day 11 #Grid calculate', t => {
//   t.plan(3);
//   const g = new Grid(18);
//   g.powerUp();
//   t.equal(g.cells[0][0], -2);
//   t.equal(g.cells[44][32], 4);
//   t.equal(g.cells[299][299], 0);
// });

// tape('Day 11 #Grid bestRegion', t => {
//   t.plan(2);
//   let g1 = new Grid(18);
//   g1.powerUp();
//   t.deepEqual(g1.bestRegion(), [33, 45]);
//   let g2 = new Grid(42);
//   g2.powerUp();
//   t.deepEqual(g2.bestRegion(), [21, 61]);
// });
