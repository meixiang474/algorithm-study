// leetcode 1089

export default function duplicateZeros(nums: number[]) {
  const length = nums.length
  for(let i = 0; i < length; i++) {
    if(nums[i] === 0) {
      nums.splice(i, 0, 0)
      i++
    }
  }
  nums.length = length
}
