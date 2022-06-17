// leetcode 42

export default function trap(heights: number[]) {
  const left = [heights[0]];
  for (let i = 1; i < heights.length; i++) {
    left[i] = Math.max(heights[i], left[i - 1]);
  }
  const right: number[] = [];
  right[heights.length - 1] = heights[heights.length - 1];
  for (let i = heights.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], heights[i]);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res += Math.min(left[i], right[i]) - heights[i];
  }
  return res;
}
