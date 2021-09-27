// leetcode 217

export default function containsDuplicate(nums: number[]): boolean {
  const map = new Map<number, boolean>();
  for (let item of nums) {
    if (map.has(item)) {
      return true;
    }
    map.set(item, true);
  }
  return false;
}
