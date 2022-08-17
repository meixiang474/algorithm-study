// leetcode 581

export default function findUnsortedSubarray(nums: number[]) {
  const isSorted = (arr: number[]) => {
    let res = true;
    for (let i = 1; i < arr.length; i++) {
      const prev = arr[i - 1];
      const current = arr[i];
      if (prev > current) {
        res = false;
        break;
      }
    }
    return res;
  };
  if (isSorted(nums)) return 0;
  const temp = [...nums].sort((a, b) => a - b);
  let left = 0;
  while (temp[left] === nums[left]) {
    left++;
  }
  let right = nums.length - 1;
  while (temp[right] === nums[right]) {
    right--;
  }
  return right - left + 1;
}
