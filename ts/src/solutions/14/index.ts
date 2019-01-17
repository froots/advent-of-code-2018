export function solve(): void {
  console.time('day14.1');
  console.log(`Day 14, part 1: ${solutionA(894501)}`);
  console.timeEnd('day14.1');
}

export function solutionA(steps: number): string {
  let recipes = new CircularLinkedList(3, 7);
  let r1 = recipes.at(0);
  let r2 = recipes.at(1);

  while(r1 && r2 && recipes.size < steps + 10) {
    console.log(recipes.size);
    [recipes, r1, r2] = step(recipes, r1, r2);
  }

  return [...recipes].slice(steps, steps + 10).join('');
}

export function step(
  recipes: CircularLinkedList,
  r1: ListNode,
  r2: ListNode
): [CircularLinkedList, ListNode, ListNode] {

  digitSum(r1.data, r2.data)
    .forEach(newVal => recipes.add(newVal));

  for (let n = 0, len = r1.data + 1; n < len; n++) {
    r1 = r1.next || r1;
  }

  for (let n = 0, len = r2.data + 1; n < len; n++) {
    r2 = r2.next || r2;
  }

  return [
    recipes,
    r1,
    r2
  ];
}

export function digitSum(n1: number, n2: number): number[] {
  return (n1 + n2).toString().split('').map(Number);
}

export class CircularLinkedList {
  head: ListNode | null;
  tail: ListNode | null;
  size: number;

  constructor(...items: any[]) {
    this.size = 0;
    this.head = null;
    this.tail = null;
    items.forEach(item => this.add(item));
  }

  add(data: any): ListNode {
    const node = new ListNode(data);
    let end = this.tail;

    if (!end) {
      this.head = node;
    } else {
      end.next = node;
    }

    this.tail = node;
    node.next = this.head;
    this.size++;

    return node;
  }

  at(idx: number): ListNode | null {
    if (!this.head || !this.head.next) {
      return null;
    }
    let currentNode: ListNode = <ListNode>this.head;
    let count = 0;
    while (count !== idx) {
      currentNode = <ListNode>currentNode.next;
      count++;
    }
    return currentNode;
  }

  *[Symbol.iterator](): IterableIterator<any> {
    let list = this;
    let cursor = list.head;
    let count = 0;
    if (!cursor) {
      return { done: true };
    } else {
      while (cursor && count < this.size) {
        yield cursor.data;
        cursor = cursor.next;
        count++;
      }
    }
  }
}

export class ListNode {
  data: any;
  next: ListNode | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}
