export default function removeElement(nums: number[], val: number) {
  let res = nums.length;
  let i = 0;
  while (i < res) {
    if (nums[i] === val) {
      res--;
      for (let j = i; j < nums.length - 1; j++) {
        nums[j] = nums[j + 1];
      }
    } else {
      i++;
    }
  }
  return res;
}
