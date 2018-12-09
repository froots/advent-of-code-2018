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

tape('Day 7 part 1', t => {
  t.plan(1);
  t.equal(solutionA(input), 'CABDFE');
});

tape('Day 7 Graph#constructor', t => {
  t.plan(7);
  const graph = new Graph(input);
  t.equal(graph.adjList.size, 6)
  t.deepEqual(graph.adjList.get('C'), ['A', 'F']);
  t.deepEqual(graph.adjList.get('A'), ['B', 'D']);
  t.deepEqual(graph.adjList.get('B'), ['E']);
  t.deepEqual(graph.adjList.get('D'), ['E']);
  t.deepEqual(graph.adjList.get('E'), []);
  t.deepEqual(graph.adjList.get('F'), ['E']);
});

tape('Day 7 Graph#vertices', t => {
  t.plan(1);
  const graph = new Graph(input);
  t.deepEqual(graph.vertices, ['A', 'B', 'C', 'D', 'E', 'F']);
})

tape('Day 7 Graph#edges', t => {
  t.plan(1);
  const graph = new Graph(input);
  t.deepEqual(graph.edges, ['A', 'B', 'D', 'E', 'F']);
});

tape('Day 7 Graph#iterate', t => {
  t.plan(1);
  const graph = new Graph(input);
  t.deepEqual([...graph], ['C', 'A', 'B', 'D', 'F', 'E']);
});


