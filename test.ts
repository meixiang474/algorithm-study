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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 56-II 57-II
export function singleNumber(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let [key, value] of map) {
    if (value === 1) return key;
  }
}

export function findSequence(target: number) {
  const res: number[][] = [];
  let l = 1,
    r = 2;
  while (l < r) {
    const sum = ((l + r) * (r - l + 1)) / 2;
    if (sum === target) {
      const arr = [];
      for (let i = l; i <= r; i++) {
        arr.push(i);
      }
      res.push(arr);
      l++;
    } else if (sum < target) {
      r++;
    } else {
      l++;
    }
  }
  return res;
}

// binary search
export function binarySearch(nums: number[], target: number) {
  const search = (nums: number[], l: number, r: number): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      return search(nums, l, r - 1);
    } else {
      return search(nums, l + 1, r);
    }
  };
  return search(nums, 0, nums.length - 1);
}

export function binarySearch1(nums: number[], target: number) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// > target的第一个
export function upper(nums: number[], target: number) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(nums: number[], target: number) {
  const index = upper(nums, target);
  if (index - 1 >= 0 && nums[index - 1] === target) {
    return index - 1;
  }
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(nums: number[], target: number) {
  let l = 0,
    r = nums.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// < target得第一个
export function lower(nums: number[], target: number) {
  let l = -1,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (nums[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// = target的最后一个，< target的第一个
export function upperFloor(nums: number[], target: number) {
  let l = -1,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (nums[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// < target得第一个，= target得第一个
export function lowerFloor(nums: number[], target: number) {
  const index = lower(nums, target);
  if (index + 1 < nums.length && nums[index + 1] === target) return index + 1;
  return index;
}

export function fn(x: number) {
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

// hot 45 - 48
export function maxProfit(prices: number[]) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i + 1] > prices[i]) {
      profit += prices[i + 1] - prices[i];
    }
  }
  return profit;
}

export function maxPathSum(root: TreeNode | null) {
  if (!root) return 0;
  let res = -Infinity;
  const dfs = (node: TreeNode): number => {
    const left = Math.max(node.left ? dfs(node.left) : 0, 0);
    const right = Math.max(node.right ? dfs(node.right) : 0, 0);
    res = Math.max(node.val + left + right, res);
    return Math.max(left, right) + node.val;
  };
  dfs(root);
  return res;
}

export function longestConsecutive(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    set.add(item);
  }
  let res = 0;
  for (let item of nums) {
    if (!set.has(item - 1)) {
      let current = item;
      let length = 1;
      while (set.has(current + 1)) {
        current++;
        length++;
      }
      res = Math.max(res, length);
    }
  }
  return res;
}

export function singleNumber1(nums: number[]) {
  let res = 0;
  for (let item of nums) {
    res ^= item;
  }
  return res;
}

// binarySearch 6-10
export function kthSmallest(root: TreeNode | null, k: number) {
  if (!root) return 0;
  let index = 0;
  let res = 0;
  const dfs = (node: TreeNode) => {
    if (node.left) dfs(node.left);
    if (index >= k) return;
    index++;
    if (index === k) {
      res = node.val;
      return;
    }
    if (node.right) dfs(node.right);
  };
  dfs(root);
  return res;
}

export function findDuplicate(nums: number[]) {
  let l = 1,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    let cnt = 0;
    for (let item of nums) {
      if (item <= mid) cnt++;
    }
    if (cnt <= mid) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}
