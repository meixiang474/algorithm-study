// leetcode 220

function containsDuplicate(nums: number[], k: number, t: number): boolean {
  const map = new Map<number, number>();
  const getId = (num: number) =>
    num < 0 ? Math.floor((num + 1) / (t + 1)) - 1 : Math.floor(num / (t + 1));
  for (let i = 0; i < nums.length; i++) {
    const id = getId(nums[i]);
    if (map.has(id)) return true;
    if (map.has(id + 1) && Math.abs(nums[i] - map.get(id + 1)!) <= t) {
      return true;
    }
    if (map.has(id - 1) && Math.abs(nums[i] - map.get(id - 1)!) <= t) {
      return true;
    }
    map.set(id, nums[i]);
    if (i >= k) {
      map.delete(getId(nums[i - k]));
    }
  }
  return false;
}
