// leetcode 560

export default function subarraySum(nums: number[], k: number) {
  const map = new Map<number, number>();
  map.set(0, 1);
  let res = 0,
    pre = 0;
  for (let i = 0; i < nums.length; i++) {
    pre += nums[i];
    if (map.has(pre - k)) {
      res += map.get(pre - k)!;
    }
    map.set(pre, map.has(pre) ? map.get(pre)! + 1 : 1);
  }
  return res;
}
