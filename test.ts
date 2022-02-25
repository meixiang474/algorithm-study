// offer 15
export function harmmingWeight(n: number) {
  return n
    .toString(2)
    .split("")
    .reduce((memo, current) => {
      if (current === "1") memo++;
      return memo;
    }, 0);
}

// fenzhi donggui tanxin huisu
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

export function reverseTree(root: TreeNode | null) {
  if (!root) return null;
  const dfs = (node: TreeNode) => {
    const temp = node.left;
    node.left = node.right;
    node.right = temp;
    if (node.left) dfs(node.left);
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return root;
}

export function isSameTree(p: TreeNode | null, q: TreeNode | null) {
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
}

export function fn(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (p: TreeNode | null, q: TreeNode | null) => {
    if (!p && !q) return true;
    if (
      p &&
      q &&
      p.val === q.val &&
      isMirror(p.left, q.right) &&
      isMirror(p.right, q.left)
    )
      return true;
    return false;
  };
  return isMirror(root.left, root.right);
}

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  if (nums.length === 0) return 0;
  const dp = [0, nums[0]];
  for (let i = 2; i <= nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
  }
  return dp[nums.length];
}

export function rob1(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    const dp = [0, nums[0]];
    for (let i = 2; i <= nums.length; i++) {
      dp[i] = Math.max(dp[i - 1] + dp[i - 2] + nums[i - 1]);
    }
    return dp[nums.length];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

// math 1 - 5
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function addTwo(l1: ListNode | null, l2: ListNode | null) {
  const res = new ListNode(-1);
  let p1 = l1;
  let p2 = l2;
  let p3 = res;
  let carry = 0;
  while (p1 || p2) {
    const n1 = p1 ? p1.val : 0;
    const n2 = p2 ? p2.val : 0;
    const sum = n1 + n2 + carry;
    carry = Math.floor(sum / 10);
    p3.next = new ListNode(sum % 10);
    p3 = p3.next;
    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return res.next;
}

export function myPow(x: number, n: number) {
  const isNegative = n < 0;
  n = Math.abs(n);
  const absPow = (x: number, n: number): number => {
    if (n === 0) return 1;
    if (n === 1) return x;
    const res = absPow(x, Math.floor(n / 2));
    return n % 2 === 0 ? res * res : res * res * x;
  };
  return isNegative ? 1 / absPow(x, n) : absPow(x, n);
}

export function getPermutation(n: number, k: number) {
  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum *= i;
  }
  const bc = (path: number[]): string => {
    if (path.length === n) {
      return path.join("");
    }
    groupNum = groupNum / (n - path.length);
    for (let i = 1; i <= n; i++) {
      if (path.includes(i)) continue;
      if (k > groupNum) {
        k -= groupNum;
      } else {
        return bc(path.concat(i));
      }
    }
    return "";
  };
  return bc([]);
}

export function sqrt(n: number) {
  let l = 0,
    r = n;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 <= n) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

export function isHappy(n: number) {
  const compute = (n: number) => {
    return n
      .toString()
      .split("")
      .reduce((memo, current) => {
        return memo + parseInt(current) ** 2;
      }, 0);
  };
  const map = new Map<number, true>();
  while (!map.has(n)) {
    if (n === 1) return true;
    map.set(n, true);
    n = compute(n);
  }
  return false;
}
