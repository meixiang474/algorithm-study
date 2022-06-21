// leetcode 55

export default function canJump(nums: number[]) {
  let max = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= max) {
      max = Math.max(max, i + nums[i]);
      if (max >= nums.length - 1) {
        return true;
      }
    }
  }
  return false;
}
