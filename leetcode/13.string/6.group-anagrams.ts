// leetcode 49

export default function groupAnagrams(strs: string[]) {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const key = item.split("").sort().join("");
    if (map.has(key)) {
      map.get(key)?.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  const res: string[][] = [];
  map.forEach((value, key) => {
    res.push(value);
  });
  return res;
}
