// leetcode 467

export default function findSubstringInWraproundString(p: string): number {
  const dp: number[] = new Array(26).fill(0);
  let length = 0;
  for (let i = 0; i < p.length; i++) {
    if (
      i > 0 &&
      (p[i].charCodeAt(0) - p[i - 1].charCodeAt(0) + 26) % 26 === 1
    ) {
      length++;
    } else {
      length = 1;
    }
    dp[p[i].charCodeAt(0) - "a".charCodeAt(0)] = Math.max(
      dp[p[i].charCodeAt(0) - "a".charCodeAt(0)],
      length
    );
  }
  return dp.reduce((memo, current) => memo + current, 0);
}
