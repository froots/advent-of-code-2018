import { solve as s1 } from '../solutions/1';
import { solve as s2 } from '../solutions/2';
import { solve as s3 } from '../solutions/3';
import { solve as s4 } from '../solutions/4';

const solutions = [
  s1,
  s2,
  s3,
  s4
];

if (process.argv[2]) {
  const day = Number(process.argv[2]);
  console.log(day);
  solutions[day - 1]();
} else {
  solutions.forEach(solution => solution());
}
