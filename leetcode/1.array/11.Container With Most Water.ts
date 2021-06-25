export function maxArea(height: number[]) {
  // 定义双指针
  let l = 0,
    r = height.length - 1;
  let res = 0;
  // 因为是求面积，所以 l = r 时跳出循环
  while (l < r) {
    // 计算首尾之间的面积
    const area = Math.min(height[l], height[r]) * (r - l);
    res = Math.max(area, res);
    // 保留高的一方，将另一方的指针进行移动
    if (height[l] > height[r]) {
      r--;
    } else {
      l++;
    }
  }
  return res;
}
