// offer 31
export default function validateStackSequence(
  pushed: number[],
  popped: number[]
) {
  let stack: number[] = [];
  for (let item of pushed) {
    stack.push(item);
    while (stack.length && stack[stack.length - 1] === popped[0]) {
      popped.shift();
      stack.pop();
    }
  }
  return stack.length === 0;
}

// binary search
export function binarySearch(data: number[], target: number) {
  const searchData = (data: number[], l: number, r: number): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] > target) {
      return searchData(data, l, mid - 1);
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r);
    } else {
      return mid;
    }
  };
  return searchData(data, 0, data.length - 1);
}

export function binarySearch1(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// > target的第一个
export function upper(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(data: number[], target: number) {
  const index = upper(data, target);
  if (index - 1 >= 0 && data[index - 1] === target) return index - 1;
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(data: number[], target: number) {
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
}

// < target得第一个
export function lower(data: number[], target: number) {
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
}

// = target的最后一个，< target的第一个
export function upperFloor(data: number[], target: number) {
  let l = -1,
    r = data.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// < target得第一个，= target得第一个
export function lowerFloor(data: number[], target: number) {
  const index = lower(data, target);
  if (index + 1 < data.length && data[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function mySqrt(x: number) {
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
}

// leetcode hashtable 6-10
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

export function inorderTraversal(root: TreeNode | null) {
  if (!root) return [];
  const res: number[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node.val);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: ListNode | null) {
  if (!head) return head;
  const map = new Map<ListNode | null, ListNode | null>();
  map.set(null, null);
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    map.set(node, newNode);
    if (!map.has(node.random)) {
      dfs(node.random!);
    }
    newNode.random = map.get(node.random)!;
    if (!map.has(node.next)) {
      dfs(node.next!);
    }
    newNode.next = map.get(node.next)!;
  };
  dfs(head);
  return map.get(head);
}

export function isHappy(n: number) {
  const compute = (n: number) => {
    return n
      .toString()
      .split("")
      .map((item) => parseInt(item))
      .reduce((memo, current) => {
        return memo + current ** 2;
      }, 0);
  };
  const set = new Set<number>();
  while (!set.has(n)) {
    if (n === 1) return true;
    set.add(n);
    n = compute(n);
  }
  return false;
}
