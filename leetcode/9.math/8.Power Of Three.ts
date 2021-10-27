// leetcode 326

export default function powerOfThree(n: number): boolean {
  if (n === 0) return false;
  if (n === 1) return true;
  if (n % 3 !== 0) return false;
  return powerOfThree(n / 3);
}
