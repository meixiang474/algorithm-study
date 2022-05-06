// leetcode 4

export default function findMedian(nums1: number[], nums2: number[]) {
  const m = nums1.length;
  const n = nums2.length;

  const find = (nums1: number[], nums2: number[], k: number): number => {
    let i1 = 0,
      i2 = 0;
    while (true) {
      if (i1 === nums1.length) {
        return nums2[i2 + k - 1];
      }
      if (i2 === nums2.length) {
        return nums1[i1 + k - 1];
      }
      if (k === 1) {
        return Math.min(nums1[i1], nums2[i2]);
      }
      const half = Math.floor(k / 2);
      let newi1 = Math.min(i1 + half, nums1.length) - 1;
      let newi2 = Math.min(i2 + half, nums2.length) - 1;
      if (nums1[newi1] <= nums2[newi2]) {
        k -= newi1 - i1 + 1;
        i1 = newi1 + 1;
      } else {
        k -= newi2 - i2 + 1;
        i2 = newi2 + 1;
      }
    }
  };

  if ((m + n) % 2 === 1) {
    const mid = Math.floor((m + n) / 2);
    // 在两个数组中寻找第mid+1小的数
    return find(nums1, nums2, mid + 1);
  } else {
    const mid1 = Math.floor((m + n) / 2) - 1;
    const mid2 = Math.floor((m + n) / 2);
    return (find(nums1, nums2, mid1 + 1) + find(nums1, nums2, mid2 + 1)) / 2;
  }
}
