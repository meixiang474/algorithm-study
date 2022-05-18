// leetcode 1768

export default function mergeAlternately(word1: string, word2: string): string {
  let res = "";
  for (let i = 0; i < word1.length || i < word2.length; i++) {
    res += word1.charAt(i);
    res += word2.charAt(i);
  }
  return res;
}
