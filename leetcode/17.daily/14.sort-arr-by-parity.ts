// leetcode 905

export default function sortArrayByParity(nums: number[]): number[] {
  return nums.sort((a, b) => {
    if (a % 2 === b % 2) return 0;
    if (a % 2 === 0) return -1;
    return 1;
  });
}
