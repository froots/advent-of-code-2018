export function solve(): void {
  console.time('day14.1');
  console.log(`Day 14, part 1: ${solutionA(894501)}`);
  console.timeEnd('day14.1');
}

export function solutionA(steps: number): string {
  let state: State = {
    recipes: new CircularLinkedList(3, 7),
    pointers: [0, 1]
  };

  while(state.recipes.size < steps + 10) {
    console.log(state.recipes.size);
    state = step(state);
  }

  return [...state.recipes].slice(steps, steps + 10).join('');
}

export function step(state: State): State {
  let [p1, p2] = state.pointers;
  const r1: ListNode | null = state.recipes.at(p1);
  const r2: ListNode | null = state.recipes.at(p2);

  if (!r1 || !r2) {
    throw new Error('No pointers');
  }

  digitSum(r1.data, r2.data)
    .forEach(newVal => state.recipes.add(newVal));

  p1 = (p1 + r1.data + 1) % state.recipes.size;
  p2 = (p2 + r2.data + 1) % state.recipes.size;

  return {
    recipes: state.recipes,
    pointers: [p1, p2]
  };
}

export function digitSum(n1: number, n2: number): number[] {
  return (n1 + n2).toString().split('').map(Number);
}

export type State = {
  recipes: CircularLinkedList,
  pointers: [number, number]
};

export class CircularLinkedList {
  head: ListNode | null;
  size: number;

  constructor(...items: any[]) {
    this.size = 0;
    this.head = null;
    items.forEach(item => this.add(item));
  }

  add(data: any): ListNode {
    const node = new ListNode(data);
    let currentNode = this.head;

    if (!currentNode) {
      this.head = node;
    } else if (currentNode.next === currentNode) {
      currentNode.next = node;
    } else {
      while (currentNode.next && currentNode.next !== this.head) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }

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

class ListNode {
  data: any;
  next: ListNode | null;

  constructor(data: any) {
    this.data = data;
    this.next = null;
  }
}
