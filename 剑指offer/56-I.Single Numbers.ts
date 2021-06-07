/**
 * @description 剑指offer 56-I
 */

export default function singleNumbers(nums: number[]): number[] {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  map.forEach((val, key) => {
    if (val === 1) {
      res.push(key);
    }
  });
  return res;
}
