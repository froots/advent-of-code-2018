import { solve as s1 } from '../solutions/1';
import { solve as s2 } from '../solutions/2';
import { solve as s3 } from '../solutions/3';
import { solve as s4 } from '../solutions/4';
import { solve as s5 } from '../solutions/5';
import { solve as s6 } from '../solutions/6';
import { solve as s7 } from '../solutions/7';
import { solve as s8 } from '../solutions/8';
import { solve as s9 } from '../solutions/9';
import { solve as s10 } from '../solutions/10';
import { solve as s11 } from '../solutions/11';

const solutions = [
  s1,
  s2,
  s3,
  s4,
  s5,
  s6,
  s7,
  s8,
  s9,
  s10,
  s11
];

if (process.argv[2]) {
  const day = Number(process.argv[2]);
  console.log(day);
  solutions[day - 1]();
} else {
  solutions.forEach(solution => solution());
}
