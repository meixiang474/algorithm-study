// leetcode 128

export default function longestConsecutive(nums: number[]) {
  const set = new Set<number>();
  for (let item of nums) {
    set.add(item);
  }
  let res = 0;
  for (let item of nums) {
    if (!set.has(item - 1)) {
      let current = item;
      let length = 1;
      while (set.has(current + 1)) {
        length++;
        current++;
      }
      res = Math.max(res, length);
    }
  }
  return res;
}
