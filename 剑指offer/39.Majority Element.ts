/**
 * @description 剑指offer 39
 */

export default function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    map.set(current, map.has(current) ? map.get(current)! + 1 : 1);
    if (map.get(current)! > nums.length / 2) {
      return current;
    }
  }
}
