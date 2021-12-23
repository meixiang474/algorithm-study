// offer 63

export function maxProfit(prices: number[]) {
  let minPrice = Infinity;
  let maxPrice = 0;
  for (let item of prices) {
    minPrice = Math.min(minPrice, item);
    maxPrice = Math.max(maxPrice, item - minPrice);
  }
  return maxPrice;
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
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)!];
    }
    map.set(current, i);
  }
  return [-1, -1];
}

export function fn1(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
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
  let needType = need.size;
  let res = "";
  while (r < s.length) {
    const current = s[r];
    if (need.has(current)) {
      need.set(current, need.get(current)! - 1);
      if (need.get(current) === 0) {
        needType--;
      }
    }
    while (needType === 0) {
      let newRes = s.slice(l, r + 1);
      if (res === "" || newRes.length < res.length) {
        res = newRes;
      }
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
