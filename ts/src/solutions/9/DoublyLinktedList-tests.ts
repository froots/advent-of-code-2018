import tape from 'tape';
import { DoublyLinkedList } from './DoublyLinkedList';

tape('Day 9 DoublyLinkedList - empty', t => {
  t.plan(2);
  const list = new DoublyLinkedList();
  t.isEqual(list.firstNode, null);
  t.isEqual(list.lastNode, null);
});
