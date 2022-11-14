import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";
import { Heap } from "./practice/week5/1.heap";
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class ListNode1 {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 68-II 3
export function lowestCommon(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  let res = null;
  const dfs = (
    node: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
  ): boolean => {
    if (!node || !p || !q) return false;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    if (
      (left && right) ||
      ((node.val === p.val || node.val === q.val) && (left || right))
    )
      res = node;
    return left || right || node.val === p.val || node.val === q.val;
  };
  dfs(root, p, q);
  return res;
}

export function findRepeatNumber(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    if (set.has(item)) return item;
    set.add(item);
  }
}

// priorityqueue shellsort
export class PriorityQueue<T = number> {
  maxHeap: Heap<T>;
  constructor(compare: (a: T, b: T) => boolean) {
    this.maxHeap = new Heap("max", compare);
  }
  getSize() {
    return this.maxHeap.size();
  }
  isEmpty() {
    return this.maxHeap.size() === 0;
  }
  getFront() {
    return this.maxHeap.peek();
  }
  enqueue(item: T) {
    this.maxHeap.insert(item);
  }
  dequeue() {
    if (this.isEmpty()) throw new Error("error");
    return this.maxHeap.pop();
  }
}

export function shellSort(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(nums.length / 2);
  while (h) {
    for (let start = 0; start < h; start++) {
      for (let i = start; i < res.length; i += h) {
        let swapIndex = i;
        let current = res[i];
        for (let j = i - h; j >= start; j -= h) {
          if (res[j] > current) {
            swapIndex = j;
            res[j + h] = res[j];
          } else {
            break;
          }
        }
        if (swapIndex !== i) {
          res[swapIndex] = current;
        }
      }
    }
    h = Math.floor(h / 2);
  }
  return h;
}

export function shellSort1(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(res.length / 2);
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; j -= h) {
        if (res[j] > current) {
          swapIndex = j;
          res[j + h] = res[j];
        } else {
          break;
        }
      }
      if (swapIndex !== i) {
        res[swapIndex] = current;
      }
    }
    h = Math.floor(h / 2);
  }
  return res;
}

export function shellSort2(nums: number[]) {
  const res = [...nums];
  let h = Math.floor(nums.length / 2);
  while (h < res.length) {
    h = h * 3 + 1;
  }
  while (h) {
    for (let i = h; i < res.length; i++) {
      let swapIndex = i;
      const current = res[i];
      for (let j = i - h; j >= 0; j -= h) {
        if (res[j] > current) {
          swapIndex = j;
          res[j + h] = res[j];
        } else {
          break;
        }
      }
      if (swapIndex !== i) {
        res[swapIndex] = current;
      }
    }
    h = Math.floor(h / 3);
  }
  return res;
}

// hot 69-72
// todo

// linkedlist 6-10
export function rotateRight(head: ListNode | null, k: number) {
  if (k === 0 || !head || !head.next) return head;
  let count = 1;
  let current = head;
  while (current.next) {
    count++;
    current = current.next;
  }
  current.next = head;
  k = count - (k % count);
  let prev = head;
  for (let i = 0; i < k - 1; i++) {
    prev = prev.next!;
  }
  const res = prev.next;
  prev.next = null;
  return res;
}

export function deleteDuplicates(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  const res = deleteDuplicates(head.next);
  if (res && res.val === head.val) {
    return res.next;
  } else if (head.val === head.next.val) {
    return res;
  } else {
    head.next = res;
    return head;
  }
}

export function deleteDuplicates1(head: ListNode | null) {
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let prev = dummyHead;
  while (prev && prev.next && prev.next.next) {
    if (prev.next.val === prev.next.next.val) {
      prev.next = prev.next.next;
    } else {
      prev = prev.next;
    }
  }
  return dummyHead.next;
}

export function partition(head: ListNode | null, x: number) {
  const minHead = new ListNode(-1);
  const maxHead = new ListNode(-1);
  let current = head;
  let p1 = minHead;
  let p2 = maxHead;
  while (current) {
    if (current.val < x) {
      p1.next = current;
      p1 = p1.next;
    } else {
      p2.next = current;
      p2 = p2.next;
    }
    current = current.next;
  }
  p2.next = null;
  p1.next = maxHead.next;
  return minHead.next;
}

export function reverseBetween(
  head: ListNode | null,
  left: number,
  right: number
) {
  if (!head || !head.next) return head;
  let index = 0;
  let leftNode: ListNode | null = null,
    rightNode: ListNode | null = null,
    nextNode: ListNode | null = null,
    prevNode: ListNode | null = null;
  let current = head;
  while (current) {
    if (index === left - 2) {
      prevNode = current;
    } else if (index === left - 1) {
      leftNode = current;
    } else if (index === right - 1) {
      rightNode = current;
      nextNode = current.next;
    }
  }
  let prev: ListNode | null = null;
  let reverseCurrent = leftNode;
  while (reverseCurrent) {
    const temp = reverseCurrent.next;
    reverseCurrent.next = prev;
    prev = reverseCurrent;
    reverseCurrent = temp;
  }
  if (prevNode) {
    prevNode.next = prev;
  } else {
    head = prev;
  }
  if (prev) {
    prev.next = nextNode;
  }
  return head;
}
