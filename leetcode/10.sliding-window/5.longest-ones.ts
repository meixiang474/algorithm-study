// leetcode 1004

export default function longestOnes(nums: number[], k: number) {
  let max = 0, l = 0, r = 0, onesInWindow = 0
  while(r < nums.length) {
    const current = nums[r]
    if(current === 1) onesInWindow++
    max = Math.max(max, onesInWindow)
    if(r - l + 1 - max > k) {
      const currentL = nums[l]
      if(currentL === 1) onesInWindow--
      l++
    }
    r++
  }
  return r - l
}