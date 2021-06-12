/**
 * @description 剑指offer 61
 */

export default function isStraight(nums: number[]) {
  const set = new Set<number>();
  let max = 0,
    min = 14;
  for (let item of nums) {
    if (item === 0) continue;
    if (set.has(item)) return false;
    max = Math.max(item, max);
    min = Math.min(item, min);
    set.add(item);
  }
  return max - min < 5;
}
