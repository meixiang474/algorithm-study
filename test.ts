export function fn(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function fn1(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], true);
  }
  const res: number[] = [];
  for (let i = 0; i < nums2.length; i++) {
    if (map.get(nums2[i])) {
      res.push(nums2[i]);
      map.set(nums2[i], false);
    }
  }
  return res;
}

export function fn2(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function fn3(s: string) {
  let l = 0,
    r = 0;
  const map = new Map<string, number>();
  let res = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    map.set(current, r);
    res = Math.max(res, r - l + 1);
    r++;
  }
  return res;
}

export function fn4(s: string, t: string) {
  let l = 0,
    r = 0;
  const need = new Map<string, number>();
  for (let i = 0; i < t.length; i++) {
    need.set(t[i], need.has(t[i]) ? need.get(t[i])! + 1 : 1);
  }
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
