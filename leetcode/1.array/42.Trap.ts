export default function trap(height: number[]) {
  if (height.length === 0) return 0;
  const left = [height[0]];
  for (let i = 1; i < height.length; i++) {
    left[i] = Math.max(left[i - 1], height[i]);
  }
  const right = [];
  right[height.length - 1] = height[height.length - 1];
  for (let i = height.length - 2; i >= 0; i--) {
    right[i] = Math.max(right[i + 1], height[i]);
  }
  let res = 0;
  for (let i = 0; i < height.length; i++) {
    res += Math.min(left[i], right[i]) - height[i];
  }
  return res;
}
