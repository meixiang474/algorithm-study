// 349
export {};
function intersection(nums1: number[], nums2: number[]): number[] {
  const map = new Map();
  nums1.forEach((item) => {
    map.set(item, true);
  });
  const res: number[] = [];
  nums2.forEach((item) => {
    if (map.has(item)) {
      res.push(item);
      map.delete(item);
    }
  });
  return res;
}
