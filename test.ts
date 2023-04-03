import { BST } from "./11.BST";
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

export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

// offer 26 27
// todo

// binary search
export const binarySearch = (data: number[], target: number) => {
  const searchData = (data: number[], l: number, r: number): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) return mid;
    else if (data[mid] > target) return searchData(data, l, mid - 1);
    else return searchData(data, mid + 1, r);
  };
  return searchData(data, 0, data.length - 1);
};

export const binarySearch1 = (data: number[], target: number) => {
  let l = 0,
    r = data.length - 1;
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) return mid;
    else if (data[mid] > target) r = mid - 1;
    else l = mid + 1;
  }
  return -1;
};

// > target 的第一个
export const upper = (data: number[], target: number) => {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
};

// = target的最后一个或者 > target的第一个
export const ceil = (data: number[], target: number) => {
  const index = upper(data, target);
  if (index - 1 >= 0 && data[index - 1] === target) return index - 1;
  return index;
};

// = target第一个或者 > target第一个
export const lowerCeil = (data: number[], target: number) => {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

// < target得第一个
export const lower = (data: number[], target: number) => {
  let l = -1,
    r = data.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
};

// = target的最后一个，< target的第一个
export const upperFloor = (data: number[], target: number) => {
  let l = -1,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
};

// < target得第一个，= target得第一个
export const lowerFloor = (data: number[], target: number) => {
  const index = lower(data, target);
  if (index + 1 < data.length && data[index + 1] === target) return index + 1;
  return index;
};

export const mySqrt = (x: number) => {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= x) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
};

// hot 9 - 12
export const letterCombinations = (digits: string) => {
  if (!digits) return [];
  const graph: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const res: string[] = [];
  const dfs = (path: string, index: number) => {
    if (index >= digits.length) {
      res.push(path);
      return;
    }
    const arr = graph[digits[index]];
    for (let item of arr) {
      dfs(path + item, index + 1);
    }
  };
  dfs("", 0);
  return res;
};

export const removeNthFromEnd = (head: ListNode | null, n: number) => {
  if (!head) return null;
  const dummyHead = new ListNode(-1);
  dummyHead.next = head;
  let current: ListNode | null = dummyHead;
  const stack: ListNode[] = [];
  while (current) {
    stack.push(current);
    current = current.next;
  }
  for (let i = 0; i < n; i++) {
    stack.pop();
  }
  const prev = stack[stack.length - 1];
  if (prev.next) {
    prev.next = prev.next.next;
  }
  return dummyHead.next;
};

export const isValid = (s: string) => {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
  for (const item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) return false;
    }
  }
  return stack.length === 0;
};

export const mergeTwoLists1 = (l1: ListNode | null, l2: ListNode | null) => {
  const res = new ListNode(-1);
  let p1 = l1,
    p2 = l2,
    p3 = res;
  while (p1 && p2) {
    if (p1.val < p2.val) {
      p3.next = p1;
      p1 = p1.next;
    } else {
      p3.next = p2;
      p2 = p2.next;
    }
    p3 = p3.next;
  }
  if (p1) p3.next = p1;
  if (p2) p3.next = p2;
  return res.next;
};

// dfs 1-5
export const isValidBST = (root: TreeNode | null) => {
  const dfs = (node: TreeNode | null, floor: number, ceil: number): boolean => {
    if (!node) return false;
    if (node.val <= floor || node.val >= ceil) return false;
    return dfs(node.left, floor, node.val) && dfs(node.right, node.val, ceil);
  };
  return dfs(root, -Infinity, Infinity);
};

export const recoverTree = (root: TreeNode | null) => {
  if (!root) return null;
  const inorder = (node: TreeNode, nums: number[]) => {
    if (node.left) inorder(node.left, nums);
    nums.push(node.val);
    if (node.right) inorder(node.right, nums);
  };
  const findTwo = (nums: number[]) => {
    let x = null,
      y = null;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i + 1] < nums[i]) {
        y = i + 1;
        if (x == null) x = i;
      }
    }
    return [x, y] as [number, number];
  };
  const recover = (node: TreeNode, count: number, x: number, y: number) => {
    if (count === 0) return;
    if (node.val === x || node.val === y) {
      node.val = node.val === x ? y : x;
      count--;
    }
    if (node.left) recover(node.left, count, x, y);
    if (node.right) recover(node.right, count, x, y);
  };
  const nums: number[] = [];
  inorder(root, nums);
  const [x, y] = findTwo(nums);
  recover(root, 2, x, y);
};

export const isSameTree = (p: TreeNode | null, q: TreeNode | null) => {
  if (!p && !q) return true;
  if (
    p &&
    q &&
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  )
    return true;
  return false;
};

export const isSymmetric = (root: TreeNode | null) => {
  if (!root) return true;
  const compare = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      compare(p.left, q.right) &&
      compare(p.right, q.right)
    )
      return true;
    return false;
  };
  return compare(root.left, root.right);
};

export const maxDepth = (root: TreeNode | null) => {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  dfs(root, 1);
  return res;
};
