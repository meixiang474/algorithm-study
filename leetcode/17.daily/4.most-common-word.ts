// leetcode 819

export default function mostCommonWord(
  paragraph: string,
  banned: string[]
): string {
  const words = paragraph
    .replace(/[!?',;.]/g, " ")
    .split(/\s+/)
    .filter((item) => !banned.includes(item.toLowerCase()))
    .map((item) => item.toLowerCase());
  const map = new Map<string, number>();
  for (let word of words) {
    map.set(word, map.has(word) ? map.get(word)! + 1 : 1);
  }
  let count = 0;
  let res = "";
  map.forEach((value, key) => {
    if (value > count) {
      count = value;
      res = key;
    }
  });
  return res;
}
