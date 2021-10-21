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

// quick sort
export function quickSort(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if(l >= r) return
    const p = partition(arr, l, r)
    sortArr(arr, l, p - 1 )
    sortArr(arr, p + 1, r)
  }

  const getRandom = (l: number, r: number) => Math.floor(Math.random() * (r - l + 1) + l)
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r)
    swap(arr, l, p)
    let i = l + 1, j = r
    while(true) {
      while(i <= j && arr[i] < arr[l]) {
        i++
      }
      while(j >= i && arr[j] > arr[l]) {
        j--
      }
      if(i >= j) break
      swap(arr, i, j)
      i++
      j--
    }
    swap(arr, l, j)
    return j
  }
  const res = [...arr]
  sortArr(res, 0, res.length - 1)
  return res
}

export function quickSort1(arr: number[]) {
  const sortArr = (arr: number[], l: number, r: number) => {
    if(l >= r) return
    const {left, right} = partition(arr, l, r)
    sortArr(arr, l, left)
    sortArr(arr, right, r)
  }
  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l)
  }
  const swap = (arr: number[], i: number , j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r)
    swap(arr, p , l)
    let left = l, i = l + 1, right = r + 1
    while(i < r) {
      if(arr[i] < arr[l]) {
        left++
        swap(arr, left, i)
        i++
      }else if(arr[i] > arr[l]) {
        right--
        swap(arr, right, i)
      }else {
        i++
      }
    }
    swap(arr, l, left)
    return {
      left: left - 1,
      right
    }
  }
  const res = [...arr]
  sortArr(res, 0, res.length - 1)
  return res
}

export function sortColors(arr: (0 | 1 | 2)[]) {
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  let l = -1, i = 0, r = arr.length
  while(i < r) {
    if(arr[i] === 0) {
      l++
      swap(arr, l, i)
      i++
    }else if(arr[i] === 2) {
      r--
      swap(arr, r, i)
    }else {
      i++
    }
  }
  return arr
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k
  const sortArr = (nums: number[], l: number, r: number): number => {
    if(l >= r) return nums[l]
    const p = partition(nums, l, r)
    if(p === k) {
      return nums[p]
    }else if(p > k) {
      return sortArr(nums, l,p - 1)
    }else {
      return sortArr(nums, p + 1, k)
    }
  }
  const getRandom = (l: number, r: number) => {
    return Math.floor(l + Math.random() * (r - l + 1))
  }
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r)
    swap(nums, l, p)
    let i = l + 1, j = r
    while(true) {
      while(i <= j && nums[i] < nums[l]) {
        i++
      }
      while(j >= i && nums[j] > nums[l]) {
        j--
      }
      if(i >= j) break
      swap(nums, i, j)
      i++
      j--
    }
    swap(nums, j, l)
    return j
  }
  return sortArr([...nums], 0, nums.length - 1)
}

export function findKMin(arr: number[], k: number) {
  if(k>= arr.length) return arr
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if(l >= r) return arr.slice(0, k)
    const p = partition(arr, l, r)
    if(p === k) {
      return arr.slice(0, p)
    }else if(p > k) {
      return sortArr(arr, l, p - 1)
    }else {
      return sortArr(arr, p + 1, r)
    }
  }
  const getRandom = (l: number, r: number) => {
    return Math.floor(Math.random() * (r - l + 1) + l)
  }
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r)
    swap(arr, l, p)
    let i = l + 1, j = r
    while(true) {
      while(i <= j && arr[i] < arr[l]) {
        i++
      }
      while(j >= i && arr[j] > arr[l]) {
        j--
      }
      if(i >= j) break
      swap(arr, i, j)
      i++
      j--
    }
    swap(arr, l, j)
    return j
  }
  return sortArr([...arr], 0, arr.length - 1)
}