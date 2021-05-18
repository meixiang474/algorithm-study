export default function exchange(nums: number[]) {
  const res: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (current % 2 === 0) {
      res.push(current);
    } else {
      res.unshift(current);
    }
  }
  return res;
}
