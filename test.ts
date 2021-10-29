// offer 53-I
export function search(nums: number[], target: number) {
  const floor = (nums: number[], target: number) => {
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
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const floorIndex = floor(nums, target);
  const ceilIndex = ceil(nums, target);
  return ceilIndex - floorIndex - 1;
}

// leetcode array 40
export function combinationSum2(candidates: number[], target: number) {
  candidates = candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, start: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (start >= candidates.length) {
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      dfs(path.concat(candidates[i]), sum + candidates[i], i + 1);
    }
  };
  dfs([], 0, 0);
  return res;
}

// set map

export function fn(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}

export function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const rest = target - nums[i];
    if (map.has(rest)) {
      return [i, map.get(rest)];
    }
    map.set(nums[i], i);
  }
}

export function fn1(nums: number[]) {
  let l = 0,
    r = 0;
  const map = new Map<number, number>();
  let res = 0;
  while (r < nums.length) {
    const current = nums[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
  }
  return res;
}

export function fn2(s: string, t: string) {
  const need = new Map<string, number>();
  for (let item of t) {
    need.set(item, need.has(item) ? need.get(item)! + 1 : 1);
  }
  let l = 0,
    r = 0;
  let res = "";
  let needType = need.size;
  while (r < s.length) {
    const current = s[r];
    if (need.has(current)) {
      need.set(current, need.get(current)! - 1);
      if (need.get(current) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      const newRes = s.slice(l, r + 1);
      if (!res || res.length > newRes.length) res = newRes;
      const currentL = s[l];
      if (need.has(currentL)) {
        need.set(currentL, need.get(currentL)! + 1);
        if (need.get(currentL) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}
