export default function firstMissingPositive(nums: number[]) {
  let res = 1;
  for (let i = 0; i < nums.length; i++) {
    if (nums.includes(res)) {
      res++;
    } else {
      break;
    }
  }
  return res;
}
