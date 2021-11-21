// leetcode 324

export default function wiggleSort(nums: number[]): void {
  let l = Math.floor((nums.length - 1) / 2),
    r = nums.length - 1;
  nums
    .slice()
    .sort((a, b) => a - b)
    .forEach(
      (item, index, arr) =>
        (nums[index] = index % 2 === 0 ? arr[l--] : arr[r--])
    );
}
