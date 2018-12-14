import { DoublyLinkedNode } from './DoublyLinkedNode';

export class DoublyLinkedList {
  firstNode: null | DoublyLinkedNode;
  lastNode: null | DoublyLinkedNode;

  constructor() {
    this.firstNode = null;
    this.lastNode = null;
  }

  insertBefore(
    node: DoublyLinkedNode,
    newNode: DoublyLinkedNode
  ): DoublyLinkedList {
    newNode.next = node;
    if (node.prev === null) {
      newNode.prev = null;
      this.firstNode = newNode;
    } else {
      newNode.prev = node.prev;
      node.prev.next = newNode;
    }
    node.prev = newNode;
    return this;
  }

  insertAfter(
    node: DoublyLinkedNode,
    newNode: DoublyLinkedNode
  ): DoublyLinkedList {
    newNode.prev = node;
    if (node.next === null) {
      newNode.next = null;
      this.lastNode = newNode;
    } else {
      newNode.next = node.next;
      node.next.prev = newNode;
    }
    node.next = newNode;
    return this;
  }

  insertBeginning(newNode: DoublyLinkedNode): DoublyLinkedList {
    if (this.firstNode === null) {
      this.firstNode = newNode;
      this.lastNode = newNode;
      newNode.prev = null;
      newNode.next = null;
    } else {
      this.insertBefore(this.firstNode, newNode);
    }
    return this;
  }

  insertEnd(newNode: DoublyLinkedNode): DoublyLinkedList {
    if (this.lastNode === null) {
      this.insertBeginning(newNode);
    } else {
      this.insertAfter(this.lastNode, newNode);
    }
    return this;
  }
}
