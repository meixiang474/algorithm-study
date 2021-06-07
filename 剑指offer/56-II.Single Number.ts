/**
 * @description 剑指offer 56-II
 */

export default function singleNumber(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  let res = nums[0];
  map.forEach((val, key) => {
    if (val === 1) {
      res = key;
    }
  });
  return res;
}
