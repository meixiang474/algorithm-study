// 40
export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) => {
    return Math.floor(l + Math.random() * (r - l + 1));
  };
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[l] > arr[i]) {
        i++;
      }
      while (i <= j && arr[l] < arr[j]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length);
}

// set map
export function fn(nums1: number[], nums2: number[]) {
  return [...new Set(nums1)].filter((item) => nums2.includes(item));
}

export function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], true);
  }
  const res: number[] = [];
  for (let i = 0; i < nums2.length; i++) {
    if (map.has(nums2[i])) {
      res.push(nums2[i]);
      map.delete(nums2[i]);
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
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function fn1(s: string) {
  let l = 0,
    r = 0;
  let res = 0;
  const map = new Map<string, number>();
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
  for (let i = 0; i < t.length; i++) {
    need.set(t[i], need.has(t[i]) ? need.get(t[i])! + 1 : 1);
  }
  let needType = need.size;
  let l = 0,
    r = 0;
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
      if (res === "" || res.length > newRes.length) {
        res = newRes;
      }
      if (need.has(s[l])) {
        need.set(s[l], need.get(s[l])! + 1);
        if (need.get(s[l]) === 1) {
          needType++;
        }
      }
      l++;
    }
    r++;
  }
  return res;
}
