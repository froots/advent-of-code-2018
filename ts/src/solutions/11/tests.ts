import tape from 'tape';
import { solutionA, solutionB, cellPower} from './';

tape('Day 11 part 1', t => {
  t.plan(2);
  t.equal(solutionA(18), '33,45');
  t.equal(solutionA(42), '21,61');
});

tape('Day 11 part 2', t => {
  t.plan(2);
  t.equal(solutionB(18), '90,269,16');
  t.equal(solutionB(42), '232,251,12');
})

tape('Day 11 #cellPower', t => {
  t.plan(3);
  t.equal(cellPower(3, 5, 8), 4);
  t.equal(cellPower(122, 79, 57), -5);
  t.equal(cellPower(101, 153, 71), 4);
});
