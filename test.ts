// offer 48
export function longestSubstring(s: string) {
  let l = 0,
    r = 0;
  const map = new Map<string, number>();
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

// leetcode array 11
export function threeSumCloset(nums: number[], target: number) {
  nums = nums.sort((a, b) => a - b);
  let res = 0;
  let diff = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    const current = nums[i];
    let isEqual = false;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const currentL = nums[l];
      const currentR = nums[r];
      const sum = current + currentL + currentR;
      const newDiff = Math.abs(target - sum);
      if (newDiff < diff) {
        diff = newDiff;
        res = sum;
        if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentL) break;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentR) break;
          }
        } else {
          isEqual = true;
          break;
        }
      } else {
        if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentL) break;
          }
        } else if (sum > target) {
          while (l < r) {
            r--;
            if (nums[r] !== currentR) break;
          }
        }
      }
    }
    if (isEqual) {
      return res;
    }
  }
  return res;
}

// linearsearch selectionsort insertionsort bubblesort
function isObject(obj: any) {
  return obj && typeof obj === "object";
}

function isEqual(obj1: any, obj2: any) {
  if (!isObject(obj1) || !isObject(obj2)) return obj1 === obj2;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      const flag = isEqual(obj1[key], obj2[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch(data: any[], target: any) {
  for (let i = 0; i < data.length; i++) {
    if (isEqual(data[i], target)) {
      return i;
    }
  }
  return -1;
}

export function selectionSort(data: number[]) {
  const res = [...data];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(data, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(data: number[]) {
  const res = [...data];
  for (let i = 0; i < res.length; i++) {
    let swapIndex = i;
    const current = res[i];
    for (let j = i - 1; j >= 0; j--) {
      if (data[j] > current) {
        data[j + 1] = data[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(data: number[]) {
  const res = [...data];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - 1 - i; j++) {
      if (res[j] > res[j + 1]) {
        swap(res, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return res;
}
