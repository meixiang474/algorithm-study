export function findRepeatNumber(nums: number[]) {
  // 构建map
  const map = new Map<number, boolean>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    // 如果map中已经存在current, 说明current已经重复
    if (map.has(current)) {
      return current;
    }
    // 否则将current存入到map中
    map.set(current, true);
  }
}
