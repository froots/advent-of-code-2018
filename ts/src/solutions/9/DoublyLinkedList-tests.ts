import tape from 'tape';
import { DoublyLinkedList } from './DoublyLinkedList';
import { DoublyLinkedNode } from './DoublyLinkedNode';

tape('Day 9 DoublyLinkedList - init', t => {
  t.plan(2);
  const list = new DoublyLinkedList();
  t.isEqual(list.firstNode, null);
  t.isEqual(list.lastNode, null);
});

tape('Day 9 DoublyLinkedList - init with values', t => {
  t.plan(2);
  const list = new DoublyLinkedList([1, 2, 3, 4, 5]);
  if (!list.firstNode || !list.lastNode) {
    t.fail('Should be nodes now');
    return false;
  }
  t.isEqual(list.firstNode.data, 1);
  t.isEqual(list.lastNode.data, 5);
});

tape('Day 9 DoublyLinkedList - insertBeginning when empty', t => {
  t.plan(2);
  const node = new DoublyLinkedNode(5);
  const list = new DoublyLinkedList();
  list.insertBeginning(node);
  t.isEqual(list.firstNode, node);
  t.isEqual(list.lastNode, node);
});

tape('Day 9 DoublyLinkedList - insertBeginning when one element', t => {
  t.plan(6);
  const list = new DoublyLinkedList();
  const node1 = new DoublyLinkedNode(1);
  const node2 = new DoublyLinkedNode(2);
  node1.next = node2;
  node2.prev = node1;
  list.insertBeginning(node1);
  list.insertBeginning(node2);
  t.isEqual(list.firstNode, node2);
  t.isEqual(list.lastNode, node1);
  if (list.lastNode && list.firstNode) {
    t.isEqual(list.lastNode.prev, node2);
    t.isEqual(list.lastNode.next, null);
    t.isEqual(list.firstNode.prev, null);
    t.isEqual(list.firstNode.next, node1);
  }
});

tape('Day 9 DoublyLinkedList - insertEnd when empty', t => {
  t.plan(2);
  const list = new DoublyLinkedList();
  const node = new DoublyLinkedNode(1);
  list.insertEnd(node);
  t.isEqual(list.firstNode, node);
  t.isEqual(list.lastNode, node);
});

tape('Day 9 DoublyLinkedList - insertEnd when one element', t => {
  t.plan(6);
  const list = new DoublyLinkedList();
  const node1 = new DoublyLinkedNode(1);
  const node2 = new DoublyLinkedNode(2);
  node1.prev = node2;
  node2.next = node1;
  list.insertEnd(node1);
  list.insertEnd(node2);
  t.isEqual(list.firstNode, node1);
  t.isEqual(list.lastNode, node2);
  if (list.lastNode && list.firstNode) {
    t.isEqual(list.lastNode.prev, node1);
    t.isEqual(list.lastNode.next, null);
    t.isEqual(list.firstNode.prev, null);
    t.isEqual(list.firstNode.next, node2);
  }
});

tape('Day 9 DoublyLinkedList - remove from start', t => {
  t.plan(6);
  const list = new DoublyLinkedList();
  const node1 = new DoublyLinkedNode(1);
  const node2 = new DoublyLinkedNode(2);
  const node3 = new DoublyLinkedNode(3);
  list.insertEnd(node1);
  list.insertEnd(node2);
  list.insertEnd(node3);
  list.remove(node1);

  if (!list.firstNode || !list.lastNode) {
    t.fail('Still has first and last nodes');
    return false;
  }

  t.equal(list.firstNode, node2, 'First node has changed');
  t.equal(list.lastNode, node3, 'Last node has changed');
  t.equal(list.firstNode.prev, null, 'First node has no prev');
  t.equal(list.firstNode.next, node3, 'First node has correct next node');
  t.equal(node1.next, null, 'Removed node has no next');
  t.equal(node1.prev, null, 'Removed node has no prev');
});

tape('Day 9 DoublyLinkedList - moveLastToFirst', t => {
  t.plan(5);
  const list = new DoublyLinkedList();
  const node1 = new DoublyLinkedNode(1);
  const node2 = new DoublyLinkedNode(2);
  const node3 = new DoublyLinkedNode(3);
  const node4 = new DoublyLinkedNode(4);
  list.insertEnd(node1);
  list.insertEnd(node2);
  list.insertEnd(node3);
  list.insertEnd(node4);

  if (list.lastNode && list.firstNode) {
    t.isEqual(list.firstNode, node1, 'Node 1 is first before moving');
    t.isEqual(list.lastNode, node4, 'Node 4 is last before moving');
  }

  list.moveLastToFirst();

  if (list.lastNode && list.firstNode) {
    t.isEqual(list.firstNode, node4, 'Node 4 is first after moving');
    t.isEqual(list.firstNode.next, node1, 'Node 1 is after Node 4 after moving');
    t.isEqual(list.lastNode, node3, 'Node 3 is last after moving');
  }
});

tape('Day 9 DoublyLinkedList - values', t => {
  t.plan(1);
  const list = new DoublyLinkedList([1, 2, 3, 4, 5]);
  t.deepEqual([...list], [1, 2, 3, 4, 5]);
});
