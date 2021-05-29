/**
 * @description 剑指offer 44
 */

export default function findNthDigit(n: number) {
  let digit = 1;
  let start = 1;
  let count = 9;
  while (n > count) {
    n -= count;
    digit++;
    start *= 10;
    count = digit * start * 9;
  }
  const num = start + Math.floor((n - 1) / digit);
  return parseFloat(num.toString().charAt((n - 1) % digit));
}
