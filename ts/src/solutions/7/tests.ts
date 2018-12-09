import tape from 'tape';
import { solutionA } from './';
import { Graph } from './Graph';

const input: [string, string][] = [
  ['C', 'A'],
  ['C', 'F'],
  ['A', 'B'],
  ['A', 'D'],
  ['B', 'E'],
  ['D', 'E'],
  ['F', 'E']
];

tape.skip('Day 7 part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 'CABDFE');
});

tape.only('Day 7 Graph#constructor', t => {
  t.plan(7);
  const graph = new Graph(input);
  t.equal(graph.adjList.size, 6)
  t.deepEqual(graph.adjList.get('C'), ['A', 'F']);
  t.deepEqual(graph.adjList.get('A'), ['B', 'D']);
  t.deepEqual(graph.adjList.get('B'), ['E']);
  t.deepEqual(graph.adjList.get('D'), ['E']);
  t.deepEqual(graph.adjList.get('E'), []);
  t.deepEqual(graph.adjList.get('F'), ['E']);
})
