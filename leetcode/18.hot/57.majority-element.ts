// leetcode 169

export default function majorityElement(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let [item, count] of map) {
    if (count > Math.floor(nums.length / 2)) return item;
  }
}
