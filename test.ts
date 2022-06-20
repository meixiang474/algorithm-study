// offer 36
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

export function treeToDoublyList(root: TreeNode | null) {
  if (!root) return root;
  const res: TreeNode[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    res.push(node);
    if (node.right) dfs(node.right);
  };
  let head: TreeNode | null = null;
  let tail: TreeNode | null = null;
  for (let i = 0; i < res.length; i++) {
    const current = res[i];
    if (!tail) {
      head = tail = current;
      tail.right = head;
      head.left = tail;
    } else {
      const prev = tail;
      tail.right = current;
      tail = tail.right;
      tail.right = head;
      tail.left = prev;
      head!.left = tail;
    }
  }
  return head;
}

// fenzhi donggui tanxin huisu
export function invertTree(root: TreeNode | null) {
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

export function isSameTree(p1: TreeNode | null, p2: TreeNode | null) {
  if (!p1 && !p2) return true;
  if (
    p1 &&
    p2 &&
    p1.val === p2.val &&
    isSameTree(p1.left, p2.left) &&
    isSameTree(p1.right, p2.right)
  )
    return true;
  return false;
}

export function fn(root: TreeNode | null) {
  if (!root) return true;
  const isMirror = (p1: TreeNode | null, p2: TreeNode | null) => {
    if (!p1 && !p2) return true;
    if (
      p1 &&
      p2 &&
      p1.val === p2.val &&
      isMirror(p1.left, p2.right) &&
      isMirror(p1.right, p2.left)
    )
      return true;
    return false;
  };
  return isMirror(root.left, root.right);
}

export function climbStairs(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

export function rob(nums: number[]) {
  if (nums.length === 0) return 0;
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[nums.length - 1];
}

export function rob1(nums: number[]) {
  if (nums.length === 1) return nums[0];
  const compute = (nums: number[]) => {
    if (nums.length === 0) return 0;
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
  };
  return Math.max(compute(nums.slice(1)), compute(nums.slice(0, -1)));
}

export function findContentChildren(g: number[], s: number[]) {
  
}

// hot 3 4
export function lengthOfLongestSubstring(s: string) {
  let res = 0;
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  while (r < s.length) {
    const currentr = s[r];
    if (map.has(currentr) && map.get(currentr)! >= l) {
      l = map.get(currentr)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(currentr, r);
    r++;
  }
  return res;
}

export function findMedianSortedArray(nums1: number[], nums2: number[]) {
  const m = nums1.length;
  const n = nums2.length;
  const find = (nums1: number[], nums2: number[], k: number) => {
    let index1 = 0,
      index2 = 0;
    while (true) {
      if (index1 >= m) return nums2[index2 + k - 1];
      if (index2 >= n) return nums2[index1 + k - 1];
      const half = Math.floor(k / 2);
      const newIndex1 = Math.min(index1 + half, m) - 1;
      const newIndex2 = Math.min(index2 + half, n) - 1;
      if (nums1[newIndex1] <= nums2[newIndex2]) {
        k -= newIndex1 - index1 + 1;
        index1 = newIndex1 + 1;
      } else {
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  };
  if ((m + n) % 2 !== 0) {
    const k = Math.floor((m + n) / 2);
    return find(nums1, nums2, k + 1);
  } else {
    const k = Math.floor((m + n) / 2);
    return (find(nums1, nums2, k) + find(nums1, nums2, k + 1)) / 2;
  }
}

// leetcode string 6-10
export function groupAnagrams(string: string[]) {
  const map = new Map<string, string[]>();
  for (let item of string) {
    const key = item.split("").sort().join("");
    if (map.has(key)) {
      map.get(key)?.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  const res: string[][] = [];
  for (let [key, value] of map) {
    res.push(value);
  }
  return res;
}

export function simplifyPath(path: string) {
  const stack: string[] = [];
  const dirs = path.split("/");
  for (let item of dirs) {
    if (item === "." || item === "") continue;
    if (item === "..") {
      stack.pop();
      continue;
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}

export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp: number[] = [];
  dp[0] = s[0] === "0" ? 0 : 1;
  for (let i = 1; i < s.length; i++) {
    dp[i] =
      (s[i] === "0" ? 0 : dp[i - 1]) +
      (s[i - 1] === "0" || parseInt(s[i - 1] + s[i]) > 26
        ? 0
        : dp[i - 2] == null
        ? 1
        : dp[i - 2]);
  }
  return dp[s.length - 1];
}

export function restoreIpAddress(s: string) {
  const res: string[] = [];
  const dfs = (path: string[], index: number) => {
    if (path.length === 4) {
      if (index === s.length) {
        res.push(path.join("."));
      }
      return;
    }
    if (index === s.length) return;
    const current = s[index];
    if (current === "0") {
      dfs(path.concat(current), index + 1);
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      item = item * 10 + parseFloat(s[index]);
      if (item > 0 && item <= 255) {
        dfs(path.concat(item.toString()), i + 1);
      } else {
        break;
      }
    }
  };
  dfs([], 0);
  return res;
}

export function isPalindrome(s: string) {
  let l = 0,
    r = s.length - 1;
  while (l < r) {
    const currentl = s[l];
    const currentr = s[r];
    if (
      currentl.toLocaleLowerCase() === currentl.toLocaleUpperCase() &&
      isNaN(parseInt(currentl))
    ) {
      l++;
      continue;
    }
    if (
      currentr.toLocaleLowerCase() === currentr.toLocaleUpperCase() &&
      isNaN(parseInt(currentr))
    ) {
      r--;
      continue;
    }
    if (currentl.toLowerCase() !== currentr.toLowerCase()) return false;
    l++;
    r--;
  }
  return true;
}
