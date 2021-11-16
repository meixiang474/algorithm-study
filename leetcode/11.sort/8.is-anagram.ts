// leetcode 242

export default function isAnagram(s: string, t: string): boolean {
  const map = new Map<string, number>();
  for (let item of s) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let item of t) {
    map.set(item, map.has(item) ? map.get(item)! - 1 : -1);
  }
  let res = true;
  map.forEach((val) => {
    if (val !== 0) {
      res = false;
    }
  });
  return res;
}
