// offer 52
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null
) {
  const map = new Map<ListNode, boolean>();
  let prevA: ListNode | null = headA;
  while (prevA) {
    map.set(prevA, true);
    prevA = prevA.next;
  }
  let prevB: ListNode | null = headB;
  while (prevB) {
    if (map.has(prevB)) {
      return prevB;
    }
    prevB = prevB.next;
  }
  return null;
}

// leetcode array 39
export function combinationSum(nums: number[], target: number) {
  const res: number[][] = [];
  const backtrack = (path: number[], sum: number, index: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (sum > target) return;
    if (index >= nums.length) return;
    backtrack(path, sum, index + 1);
    backtrack([...path, nums[index]], sum + nums[index], index);
  };
  backtrack([], 0, 0);
  return res;
}

// binary search
export function binarySearch(data: number[], target: number) {
  const searchData = (
    data: number[],
    l: number,
    r: number,
    target: number
  ): number => {
    if (l > r) return -1;
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      return searchData(data, mid + 1, r, target);
    } else {
      return searchData(data, l, mid - 1, target);
    }
  };
  return searchData(data, 0, data.length - 1, target);
}

export function binarySearch1(data: number[], target: number) {
  let l = 0,
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (data[mid] === target) {
      return mid;
    } else if (data[mid] < target) {
      l = mid + 1;
    } else {
      r = mid;
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
    if (data[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(data: number[], target: number) {
  const index = upper(data, target);
  if (index - 1 >= 0 && data[index - 1] === target) {
    return index - 1;
  }
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
    r = data.length;
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
    r = data.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (data[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
}

// < target得第一个，= target得第一个
export function lowerFloor(data: number[], target: number) {
  const index = lower(data, target);
  if (index + 1 < data.length && data[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function sqrt(x: number) {
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
