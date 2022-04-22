// leetcode 396

export default function maxRotateFunction(nums: number[]) {
  const f0 = nums.reduce((memo, current, index) => {
    return (memo += index * current);
  }, 0);
  const sum = nums.reduce((a, b) => a + b);
  let n = nums.length;
  let res = f0;
  let f = f0;
  for (let i = 1; i < nums.length; i++) {
    f += sum - n * nums[n - i];
    res = Math.max(res, f);
  }
  return res;
}
