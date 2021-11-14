// leetcode 179

export default function largestNumber(nums: number[]): string {
  const res = nums
    .map((item) => item.toString())
    .sort((a, b) => parseInt(b + a) - parseInt(a + b))
    .join("");
  return res[0] === "0" ? "0" : res;
}
