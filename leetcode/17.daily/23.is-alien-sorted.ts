// leetcode 953

export default function isAlienSorted(words: string[], order: string): boolean {
  const map: number[] = [];
  let index = 0;
  for (let item of order) {
    map[item.charCodeAt(0) - "a".charCodeAt(0)] = index;
    index++;
  }
  for (let i = 0; i < words.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < words[i].length && j < words[i + 1].length; j++) {
      const currentVal = map[words[i][j].charCodeAt(0) - "a".charCodeAt(0)];
      const nextVal = map[words[i + 1][j].charCodeAt(0) - "a".charCodeAt(0)];
      if (currentVal > nextVal) {
        return false;
      } else if (currentVal < nextVal) {
        flag = true;
        break;
      }
    }
    if (!flag && words[i + 1].length < words[i].length) {
      return false;
    }
  }
  return true;
}
