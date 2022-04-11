// leetcode 128

export default function longestConsecutive(nums: number[]): number {
  const set = new Set<number>();
  for (let item of nums) {
    set.add(item);
  }
  let res = 0;
  for (let item of nums) {
    if (!set.has(item - 1)) {
      let currentRes = 1;
      let current = item;
      while (set.has(current + 1)) {
        current++;
        currentRes++;
      }
      res = Math.max(res, currentRes);
    }
  }
  return res;
}
