import tape from 'tape';
import { solutionA, parseNode, sumMetadata } from './';

const input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

tape('Day 8 part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 138);
});

tape('Day 8 #parseNode', t => {
  t.plan(9);
  let [a, remaining] = parseNode(input);
  t.equal(a.children.length, 2);
  t.equal(remaining.length, 0);
  t.deepEqual(a.metadata, [1, 1, 2]);

  let b = a.children[0];
  t.equal(b.children.length, 0);
  t.deepEqual(b.metadata, [10, 11, 12]);

  let c = a.children[1];
  t.equal(c.children.length, 1);
  t.deepEqual(c.metadata, [2]);

  let d = c.children[0];
  t.equal(d.children.length, 0);
  t.deepEqual(d.metadata, [99]);
});

tape('Day 8 #sumMetadata', t => {
  t.plan(1);
  let [node] = parseNode(input);
  t.equal(sumMetadata(node), 138);
})
