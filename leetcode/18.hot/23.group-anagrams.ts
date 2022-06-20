// leetcode 49

export default function groupAnagrams(nums: string[]) {
  const map = new Map<string, string[]>();
  for (let item of nums) {
    const str = item.split("").sort().join("");
    if (map.has(str)) {
      map.get(str)?.push(item);
    } else {
      map.set(str, [item]);
    }
  }
  const res: string[][] = [];
  for (let [key, value] of map) {
    res.push(value);
  }
  return res;
}
