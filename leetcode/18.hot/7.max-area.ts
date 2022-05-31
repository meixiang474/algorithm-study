// leetcode 11

export default function maxArea(height: number[]) {
  let res = 0;
  let l = 0,
    r = height.length - 1;
  while (l < r) {
    res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}
