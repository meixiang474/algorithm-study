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

// offer 24 25
export const reverseList = (head: ListNode | null): ListNode | null => {
  if (!head || !head.next) return head;
  const res = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return res;
};

export const mergeTwoLists = (l1: ListNode | null, l2: ListNode | null) => {
  const res = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = res;
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
  // todo
}

// bfs 1-5
export const isSymmestric = (root: TreeNode | null) => {
  if (!root) return false;
  const dfs = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      dfs(p.left, q.right) &&
      dfs(p.right, q.left)
    )
      return true;
    return false;
  };
  return dfs(root.left, root.right);
};

export const levelOrder = (root: TreeNode | null) => {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
};

export const zigzagLevelOrder = (root: TreeNode | null) => {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    if (level % 2 === 0) {
      arr.push(current.val);
    } else {
      arr.unshift(current.val);
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
};

export const levelOrderBottom = (root: TreeNode | null) => {
  if (!root) return [];
  const queue: [TreeNode, number][] = [[root, 0]];
  const res: number[][] = [];
  let currentLevel = -1;
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (currentLevel === level) {
      const arr = res[0];
      arr.push(current.val);
    } else {
      const arr = [];
      arr.push(current.val);
      res.unshift(arr);
      currentLevel = level;
    }
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
};

export const minDepth = (root: TreeNode | null) => {
  if (!root) return 0;
  const queue: [TreeNode, number][] = [[root, 1]];
  while (queue.length) {
    const [current, level] = queue.shift()!;
    if (!current.left && !current.right) return level;
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
};
