export function twoSum(nums: number[], target: number) {
  // 构建map key是nums中的值，value是值在nums中索引
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    // 如果map中存在current所需要的补充数，直接返回结果
    if (map.has(target - current)) {
      return [i, map.get(target - current)];
    }
    // 如果map中不存在current的补充数，就把current存入到map中
    map.set(current, i);
  }
}
