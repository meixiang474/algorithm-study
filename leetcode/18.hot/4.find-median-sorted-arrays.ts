// leetcode 4

export default function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
) {
  const m = nums1.length;
  const n = nums2.length;
  const find = (nums1: number[], nums2: number[], k: number) => {
    let index1 = 0,
      index2 = 0;
    while (true) {
      if (index1 === nums1.length) {
        return nums2[index2 + k - 1];
      }
      if (index2 === nums2.length) {
        return nums1[index1 + k - 1];
      }
      const half = Math.floor(k / 2);
      const newIndex1 = Math.min(index1 + half, nums1.length) - 1;
      const newIndex2 = Math.min(index2 + half, nums2.length) - 1;
      if (nums1[newIndex1] <= nums2[newIndex2]) {
        k -= newIndex1 - index1 + 1;
        index1 = newIndex1 + 1;
      } else {
        k -= newIndex2 - index2 + 1;
        index2 = newIndex2 + 1;
      }
    }
  };
  if ((m + n) % 2 === 1) {
    const k = Math.floor((m + n) / 2);
    return find(nums1, nums2, k + 1);
  } else {
    const mid1 = Math.floor((m + n) / 2) - 1;
    const mid2 = Math.floor((m + n) / 2);
    return (find(nums1, nums2, mid1 + 1) + find(nums1, nums2, mid2 + 1)) / 2;
  }
}
