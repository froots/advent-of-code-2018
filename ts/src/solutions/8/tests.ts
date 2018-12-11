import tape from 'tape';
import { solutionA, solutionB, parseNode, nodeValue1, nodeValue2 } from './';

const input = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

tape('Day 8 part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 138);
});

tape('Day 8 part 2', t => {
  t.plan(1);
  t.equal(solutionB(input), 66);
});

tape('Day 8 #parseNode', t => {
  t.plan(9);
  let [a, remaining] = parseNode(input);
  let [b, c] = a.children;
  let [d] = c.children;

  t.equal(a.children.length, 2);
  t.equal(remaining.length, 0);
  t.deepEqual(a.metadata, [1, 1, 2]);

  t.equal(b.children.length, 0);
  t.deepEqual(b.metadata, [10, 11, 12]);

  t.equal(c.children.length, 1);
  t.deepEqual(c.metadata, [2]);

  t.equal(d.children.length, 0);
  t.deepEqual(d.metadata, [99]);
});

tape('Day 8 #nodeValue1', t => {
  t.plan(1);
  let [node] = parseNode(input);
  t.equal(nodeValue1(node), 138);
})

tape('Day 8 #nodeValue2', t => {
  t.plan(3);
  let [a] = parseNode(input);
  let [b, c] = a.children;
  let [d] = c.children;
  t.equal(nodeValue2(b), 33);
  t.equal(nodeValue2(c), 0);
  t.equal(nodeValue2(d), 99);
});
