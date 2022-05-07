// leetcode 1

export default function twoSum(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)!];
    }
    map.set(current, i);
  }
}
