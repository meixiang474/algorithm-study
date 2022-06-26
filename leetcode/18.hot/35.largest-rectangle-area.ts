// leetcode 84

export default function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  const left: number[] = [];
  const right: number[] = [];
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[stack[stack.length - 1]] >= heights[i]) {
      stack.pop();
    }
    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }
  stack.length = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[stack[0]] >= heights[i]) {
      stack.shift();
    }
    right[i] = stack.length > 0 ? stack[0] : heights.length;
    stack.unshift(i);
  }
  let res = 0;
  for (let i = 0; i < heights.length; i++) {
    res = Math.max(res, (right[i] - left[i] - 1) * heights[i]);
  }
  return res;
}
