// offer 35
export class RandomListNode {
  val: number;
  next: RandomListNode | null;
  random: RandomListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: RandomListNode | null) {
  if (!head) return null;
  const map = new Map<RandomListNode, RandomListNode>();
  const dfs = (node: RandomListNode) => {
    const newNode = new RandomListNode(node.val);
    if (node.next && !map.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = node.next ? map.get(node.next)! : null;
    if (node.random && !map.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = node.random ? map.get(node.random)! : null;
  };
  dfs(head);
  return map.get(head);
}

// heap


// hot 1 2
export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) return [i, map.get(rest)];
    map.set(current, i);
  }
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = l3;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    p3 = p3.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next;
}

// leetcode stack 6-10
export function postOrderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const stack: TreeNode[] = [];
  let p: TreeNode | null = root;
  let prevRight: TreeNode | null = null;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const current = stack.pop()!;
    if (!current.right || current.right === prevRight) {
      res.push(current.val);
      prevRight = current;
    } else {
      stack.push(current);
      p = current.right;
    }
  }
  return res;
}

export function evalRPN(tokens: string[]) {
  const stack: string[] = [];
  for (let item of tokens) {
    if (isNaN(parseFloat(item))) {
      const n1 = stack.pop()!;
      const n2 = stack.pop()!;
      let res: number = eval(`${n2} ${item} ${n1}`);
      res = res > 0 ? Math.floor(res) : Math.ceil(res);
      stack.push(res + "");
    } else {
      stack.push(item);
    }
  }
  return parseFloat(stack[0]);
}

export class MinStack {
  stack: number[];
  queue: number[];
  constructor() {
    this.stack = [];
    this.queue = [];
  }
  push(item: number) {
    this.stack.push(item);
    if (!this.queue.length || this.queue[0] >= item) {
      this.queue.unshift(item);
    }
  }
  pop() {
    const res = this.stack.pop();
    if (res === this.queue[0]) this.queue.shift();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.queue[0];
  }
}

export class BSTIterator {
  current: TreeNode | null;
  stack: TreeNode[];
  constructor(root: TreeNode | null) {
    this.current = root;
    this.stack = [];
  }
  next() {
    while (this.current) {
      this.stack.push(this.current);
      this.current = this.current.left;
    }
    const current = this.stack.pop();
    this.current = current ? current.right : null;
    return current ? current.val : null;
  }
  hasNext() {
    return this.current != null || this.stack.length !== 0;
  }
}

export class MyStack {
  items: number[];
  constructor() {
    this.items = [];
  }
  push(item: number) {
    this.items.push(item);
    for (let i = 0; i < this.items.length - 1; i++) {
      this.items.push(this.items.shift()!);
    }
  }
  pop() {
    return this.items.shift();
  }
  top() {
    return this.items[0];
  }
  empty() {
    return this.items.length === 0;
  }
}
