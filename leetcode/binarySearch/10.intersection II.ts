/**
 * @description leetcode 350
 */

export default function intersect(nums1: number[], nums2: number[]): number[] {
  const map = new Map<number, number>();
  for (const item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  for (const item of nums2) {
    if (map.get(item)! > 0) {
      res.push(item);
      map.set(item, map.get(item)! > 0 ? map.get(item)! - 1 : 0);
    }
  }
  return res;
}
