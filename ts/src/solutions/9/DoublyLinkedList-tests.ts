import tape from 'tape';
import { DoublyLinkedList } from './DoublyLinkedList';
import { DoublyLinkedNode } from './DoublyLinkedNode';

tape('Day 9 DoublyLinkedList - init', t => {
  t.plan(2);
  const list = new DoublyLinkedList();
  t.isEqual(list.firstNode, null);
  t.isEqual(list.lastNode, null);
});

tape('Day 9 DoublyLinkedList - insertBeginning when empty', t => {
  t.plan(2);
  const list = new DoublyLinkedList();
  const node = new DoublyLinkedNode(5);
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
