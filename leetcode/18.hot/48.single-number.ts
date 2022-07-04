// leetcode 136

export default function singleNumber(nums: number[]) {
  let single = 0;
  for (let item of nums) {
    single ^= item;
  }
  return single;
}
