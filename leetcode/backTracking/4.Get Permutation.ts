/**
 * @description leetcode 60
 */

export default function getPermutation(n: number, k: number): string {
  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum *= i;
  }
  const backtrack = (path: number[]): string => {
    if (path.length === n) {
      return path.join("");
    }
    groupNum = groupNum / (n - path.length);
    for (let i = 1; i <= n; i++) {
      if (path.indexOf(i) !== -1) continue;
      if (k > groupNum) {
        k -= groupNum;
        continue;
      }
      return backtrack(path.concat(i));
    }
    return "";
  };
  return backtrack([]);
}
