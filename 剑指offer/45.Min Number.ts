/**
 * @description 剑指offer 45
 */

export default function (nums: number[]) {
  return nums
    .map((item) => item + "")
    .sort((a, b) => parseFloat(a + b) - parseFloat(b + a))
    .join("");
}
