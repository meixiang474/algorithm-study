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
// todo

// backtracking 6-10
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function exist(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    const temp = board[r][c];
    board[r][c] = "";
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    board[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 1);
        if (res) return true;
      }
    }
  }
  return false;
}

export function subsetsWithDup(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i - 1] === nums[i]) continue;
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function restoreIpAddresses(s: string) {
  const ips: string[] = [];
  const res: string[] = [];
  const dfs = (ipIndex: number, index: number) => {
    if (ipIndex === 4) {
      if (index === s.length) {
        res.push(ips.join("."));
      }
      return;
    }
    if (index === s.length) return;
    if (s[index] === "0") {
      ips[ipIndex] = "0";
      dfs(ipIndex + 1, index + 1);
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      const current = item * 10 + parseInt(s[i]);
      if (current > 0 && current <= 255) {
        ips[ipIndex] = current.toString();
        dfs(ipIndex + 1, i + 1);
      } else {
        break;
      }
    }
  };
  dfs(0, 0);
  return res;
}
