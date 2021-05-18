// 1
export {};
function fn(nums: number[], target: number): [number, number] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const res = target - current;
    if (map.has(res)) {
      return [map.get(res), i];
    } else {
      map.set(current, i);
    }
  }
  return [-1, -1];
}
