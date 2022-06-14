// https://www.luogu.com.cn/problem/P1376

export default function machineFactory(nums: number[][], s: number) {
  let min = Infinity;
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    const [currentV, target] = nums[i];
    min = Math.min(min + s, currentV);
    res += min * target;
  }
  return res;
}
