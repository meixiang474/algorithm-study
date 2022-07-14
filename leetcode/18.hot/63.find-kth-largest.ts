// leecode 215

export default function findKthLargest(nums: number[], k: number) {
  k = nums.length - k;
  const sortArr = (nums: number[], l: number, r: number): number => {
    if (l === r) return nums[k];
    const p = partition(nums, l, r);
    if (p === k) {
      return nums[k];
    } else if (p > k) {
      return sortArr(nums, l, p - 1);
    } else {
      return sortArr(nums, p + 1, r);
    }
  };
  const swap = (nums: number[], i: number, j: number) =>
    ([nums[i], nums[j]] = [nums[j], nums[i]]);
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[l] > nums[i]) {
        i++;
      }
      while (i <= j && nums[l] < nums[j]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}
