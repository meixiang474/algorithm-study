// 215
// 寻找第k大的数
function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  function sortArr(nums: number[], l: number, r: number): number {
    if (l >= r) return nums[l];
    let p = partition(nums, l, r);
    if (p === k) {
      return nums[p];
    } else if (p < k) {
      return sortArr(nums, p + 1, r);
    } else {
      return sortArr(nums, l, p - 1);
    }
  }
  function getRandom(l: number, r: number) {
    return Math.floor(Math.random() * (r - l + 1) + l);
  }
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  function partition(nums: number[], l: number, r: number) {
    let p = getRandom(l, r);
    swap(nums, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (j >= i && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, j, l);
    return j;
  }
  return sortArr(nums, 0, nums.length - 1);
}

// 寻找k个最小的数 剑指offer40
function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums;
  function sortArr(nums: number[], l: number, r: number): number[] {
    if (l >= r) return nums.slice(0, k);
    let p = partition(nums, l, r);
    if (p === k) {
      return nums.slice(0, k);
    } else if (p > k) {
      return sortArr(nums, l, p - 1);
    } else {
      return sortArr(nums, p + 1, r);
    }
  }
  function getRandom(l: number, r: number) {
    return Math.floor(Math.random() * (r - l + 1) + l);
  }
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  function partition(nums: number[], l: number, r: number) {
    let p = getRandom(l, r);
    swap(nums, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (j >= i && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, j, l);
    return j;
  }
  return sortArr(nums, 0, nums.length - 1);
}
