// leetcode 350

export function intersectionTwo(nums1: number[], nums2: number[]) {
  const map = new Map<number, number>();
  const res: number[] = [];
  for (let item of nums1) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of nums2) {
    if (map.has(item)) {
      res.push(item);
      map.set(item, map.get(item)! - 1);
      if (map.get(item) === 0) {
        map.delete(item);
      }
    }
  }
  return res;
}
