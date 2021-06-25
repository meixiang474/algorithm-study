/**
 * @description leetcode 349
 */

export default function intersection(nums1: number[], nums2: number[]) {
  const map = new Map<number, boolean>();
  for (const item of nums1) {
    map.set(item, true);
  }
  const res: number[] = [];
  for (const item of nums2) {
    if (map.get(item)) {
      res.push(item);
      map.delete(item);
    }
  }
  return res;
}
