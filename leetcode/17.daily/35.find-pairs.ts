// leetcode 532

export default function findPairs(nums: number[], k: number) {
  nums.sort((a, b) => a - b);
  let res = 0;
  const set = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (
      i > 0 &&
      current === nums[i - 1] &&
      (k !== 0 || (k === 0 && nums[i + 1] === current))
    )
      continue;
    const greater = current + k;
    const less = current - k;
    if (set.has(greater)) res++;
    if (set.has(less) && k !== 0) res++;
    set.add(current);
  }
  return res;
}
