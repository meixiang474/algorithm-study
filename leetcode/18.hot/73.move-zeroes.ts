// leetcode 283

export default function moveZeroes(nums: number[]) {
  let l = 0,
    r = 0;
  while (r < nums.length) {
    if (nums[r] !== 0) {
      const temp = nums[r];
      nums[r] = nums[l];
      nums[l] = temp;
      l++;
    }
    r++;
  }
}
