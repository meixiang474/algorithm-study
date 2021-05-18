// 51
export {};
function reversePairs(nums: number[]) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) res++;
    }
  }
  return res;
}

function reversePairs1(nums: number[]) {
  function sortArr(nums: number[], l: number, r: number, temp: number[]) {
    if (l >= r) return;
    let mid = Math.floor(l + (r - l) / 2);
    sortArr(nums, l, mid, temp);
    sortArr(nums, mid + 1, r, temp);
    if (nums[mid] > nums[mid + 1]) {
      merge(nums, l, mid, r, temp);
    }
  }
  function merge(
    nums: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) {
    for (let i = l; i <= r; i++) {
      temp[i] = nums[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        nums[k] = temp[j];
        j++;
      } else if (j > r) {
        nums[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        nums[k] = temp[i];
        i++;
      } else {
        nums[k] = temp[j];
        res += mid - i + 1;
        j++;
      }
    }
  }
  let res = 0;
  const temp = [...nums];
  sortArr(nums, 0, nums.length, temp);
  return res;
}
