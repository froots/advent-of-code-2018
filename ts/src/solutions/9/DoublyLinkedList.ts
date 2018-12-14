import { DoublyLinkedNode } from './DoublyLinkedNode';

export class DoublyLinkedList {
  firstNode: null | DoublyLinkedNode;
  lastNode: null | DoublyLinkedNode;

  constructor(values: any[] = []) {
    this.firstNode = null;
    this.lastNode = null;

    for (let value of values) {
      this.insertEnd(new DoublyLinkedNode(value));
    }
  }

  insertBefore(
    node: DoublyLinkedNode,
    newNode: DoublyLinkedNode
  ): DoublyLinkedList {
    if (newNode === node) {
      return this;
    }
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
    if (newNode === node) {
      return this;
    }
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
      newNode.detach();
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

  moveLastToFirst(): DoublyLinkedList {
    if (this.lastNode === null || this.lastNode === this.firstNode) {
      return this;
    }
    this.insertBeginning(this.remove(this.lastNode));
    return this;
  }

  remove(node: DoublyLinkedNode): DoublyLinkedNode {
    if (node.prev === null) {
      this.firstNode = node.next;
    } else {
      node.prev.next = node.next;
    }

    if (node.next === null) {
      this.lastNode = node.prev;
    } else {
      node.next.prev = node.prev;
    }

    node.detach();

    return node;
  }
}
