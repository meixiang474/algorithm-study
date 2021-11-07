// leetcode 1052

export default function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
): number {
  let total = 0;
  for (let i = 0; i < grumpy.length; i++) {
    if (grumpy[i] === 0) {
      total += customers[i];
    }
  }
  let increase = 0;
  for (let i = 0; i < minutes; i++) {
    increase += customers[i] * grumpy[i];
  }
  let maxIncrease = increase;
  for (let i = minutes; i < grumpy.length; i++) {
    increase =
      increase -
      customers[i - minutes] * grumpy[i - minutes] +
      customers[i] * grumpy[i];
    maxIncrease = Math.max(maxIncrease, increase);
  }
  return total + maxIncrease;
}
