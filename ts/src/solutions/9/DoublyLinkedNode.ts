export class DoublyLinkedNode {
  data: any;
  next: null | DoublyLinkedNode;
  prev: null | DoublyLinkedNode;

  constructor(data: any) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }

  detach(): void {
    this.next = null;
    this.prev = null;
  }
}
