// leetcode 239

export default function maxSlidingWindow(nums: number[], k: number) {
  if (nums.length === 0 || k === 0) return [];
  const queue: number[] = [];
  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
  }
  res.push(nums[queue[0]]);
  for (let i = k; i < nums.length; i++) {
    while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
      queue.pop();
    }
    queue.push(i);
    if (queue[0] <= i - k) queue.shift();
    res.push(nums[queue[0]]);
  }
  return res;
}
