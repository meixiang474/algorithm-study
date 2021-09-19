// leetcode 49

export default function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const str = item.split("").sort().join("");
    const arr = map.has(str) ? map.get(str)! : [];
    arr.push(item);
    if (!map.has(str)) {
      map.set(str, arr);
    }
  }
  const res: string[][] = [];
  map.forEach((value, key) => {
    res.push(value);
  });
  return res;
}
