export default function exchange(nums: number[]) {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current % 2 === 0) {
      res.push(current);
    } else {
      res.unshift(current);
    }
  }
  return res;
}

export function exchange1(nums: number[]) {
  let l = -1,
    i = 0,
    r = nums.length;
  const swap = (arr: number[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  while (i < r) {
    const current = nums[i];
    if (current % 2 !== 0) {
      l++;
      swap(nums, l, i);
      i++;
    } else {
      r--;
      swap(nums, r, i);
    }
  }
  return nums;
}