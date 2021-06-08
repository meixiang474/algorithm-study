/**
 * @description 剑指offer 57-II
 */

export default function findSequence(target: number) {
  let l = 1,
    r = 2;
  const res: number[][] = [];
  while (l < r) {
    const sum = ((l + r) * (r - l + 1)) / 2;
    if (sum === target) {
      const arr = [];
      for (let i = l; i <= r; i++) {
        arr.push(i);
      }
      res.push(arr);
      l++;
    } else if (sum < target) {
      r++;
    } else {
      l++;
    }
  }
  return res;
}
