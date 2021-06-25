/**
 * @description leetcode 167
 */

export default function twoSum(numbers: number[], target: number): number[] {
  let l = 0,
    r = numbers.length - 1;
  while (l < r) {
    const left = numbers[l];
    const right = numbers[r];
    if (left + right === target) {
      return [l + 1, r + 1];
    } else if (left + right < target) {
      l++;
    } else {
      r--;
    }
  }
  return [-1, -1];
}
