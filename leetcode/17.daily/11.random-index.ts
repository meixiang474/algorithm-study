// leetcode 398

export default class Solution {
  nums: number[];
  
  constructor(nums: number[]) {
    this.nums = nums;
  }

  pick(target: number): number {
    let count = 0;
    let res = -1;
    for (let i = 0; i < this.nums.length; i++) {
      if (this.nums[i] === target) {
        count++;
        if (Math.floor(Math.random() * count) === 0) res = i;
      }
    }
    return res;
  }
}
