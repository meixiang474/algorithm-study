// offer 30
export class MinStack {
  items: number[];
  queue: number[];
  constructor() {
    this.items = [];
    this.queue = [];
  }
  getSize() {
    return this.items.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
  push(item: number) {
    this.items.push(item);
    if (this.queue.length === 0 || item <= this.queue[0]) {
      this.queue.unshift(item);
    }
  }
  pop() {
    if (this.isEmpty()) throw new Error("error");
    const res = this.items.pop()!;
    if (res === this.queue[0]) {
      this.queue.shift();
    }
    return res;
  }
  top() {
    if (this.isEmpty()) throw new Error("error");
    return this.items[this.items.length - 1];
  }
  getMin() {
    if (this.isEmpty()) throw new Error("error");
    return this.queue[0];
  }
}

// merge sort
export function mergeSort(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
    }
  };
  sortArr(res, 0, res.length - 1, [...res]);
  return res;
}

export function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) res++;
    }
  }
  return res;
}

export function reversePairs1(nums: number[]) {
  let res = 0;
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        res += mid - i + 1;
        j++;
      }
    }
  };
  sortArr([...nums], 0, nums.length - 1, [...nums]);
  return res;
}

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function mergeTwoLists(l1: ListNode | null, l2: ListNode | null) {
  const l3 = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) {
    p3.next = p1;
  }
  if (p2) {
    p3.next = p2;
  }
  return l3.next;
}

// leetcode dfs 6-10
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

export function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null;
  const mid = Math.floor((nums.length - 1) / 2);
  const node = new TreeNode(nums[mid]);
  node.left = sortedArrayToBST(nums.slice(0, mid));
  node.right = sortedArrayToBST(nums.slice(mid + 1));
  return node;
}

export function sortedListToBST(head: ListNode | null) {
  const buildTree = (
    head: ListNode | null,
    tail: ListNode | null
  ): TreeNode | null => {
    if (head === tail) return null;
    const mid = getMid(head, tail);
    const node = new TreeNode(mid.val);
    node.left = buildTree(head, mid);
    node.right = buildTree(mid.next, tail);
    return node;
  };
  const getMid = (head: ListNode | null, tail: ListNode | null) => {
    let slow = head;
    let fast = head;
    while (slow !== tail && fast !== tail && fast!.next !== tail) {
      slow = slow!.next;
      fast = fast!.next!.next;
    }
    return slow!;
  };
  return buildTree(head, null);
}

export function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(height(node.left), height(node.right)) + 1;
  };
  return (
    Math.abs(height(root.left) - height(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

export function minDepth(root: TreeNode | null) {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) {
      return level;
    }
    if (current.left) {
      queue.push([current.left, level + 1]);
    }
    if (current.right) {
      queue.push([current.right, level + 1]);
    }
  }
}

export function hasPathSum(root: TreeNode | null, targetSum: number) {
  if (!root) return false;
  const dfs = (node: TreeNode, sum: number): boolean => {
    if (!node.left && !node.right && sum === targetSum) return true;
    let res = false;
    if (node.left) {
      res = dfs(node.left, node.left.val + sum);
    }
    if (res) return res;
    if (node.right) {
      res = dfs(node.right, node.right.val + sum);
    }
    return res;
  };
  return dfs(root, root.val);
}
