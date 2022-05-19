// leetcode 462

export default function minMoves2(nums: number[]): number {
  nums.sort((a, b) => a - b);
  let res = 0;
  let base = nums[Math.floor(nums.length / 2)];
  for (let i = 0; i < nums.length; i++) {
    res += Math.abs(nums[i] - base);
  }
  return res;
}
