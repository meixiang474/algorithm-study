// leetcode 373

import { Heap } from "./1.heap";

export default function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
) {
  const heap = new Heap<[number, number]>(
    "min",
    (a, b) => nums1[a[0]] + nums2[a[1]] < nums1[b[0]] + nums2[b[1]]
  );
  const res: [number, number][] = [];
  const set = new Set<string>()
  heap.insert([0, 0]);
  while (heap.size() > 0 && res.length < k) {
    const arr = heap.pop();
    if(set.has(arr.join('.'))) continue
    res.push([nums1[arr[0]], nums2[arr[1]]]);
    set.add(arr.join('.'))
    if (arr[0] + 1 < nums1.length) heap.insert([arr[0] + 1, arr[1]]);
    if (arr[1] + 1 < nums2.length) heap.insert([arr[0], arr[1] + 1]);
  }
  return res;
}

