// leetcode 713

export default function numSubarrayProductLessThanK(
  nums: number[],
  k: number
): number {
  let prod = 1,
    i = 0,
    res = 0;
  for (let j = 0; j < nums.length; j++) {
    prod *= nums[j];
    while (i <= j && prod >= k) {
      prod /= nums[i];
      i++;
    }
    res += j - i + 1;
  }
  return res;
}
