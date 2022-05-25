import { BST } from "./11.BST";
import { LinkedList } from "./7.LinkedList";

// offer 33

export function verifyPostorder(postorder: number[]): boolean {
  if (postorder.length === 0 || postorder.length === 1) return true;
  const upper = (data: number[], target: number) => {
    let l = 0,
      r = data.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (data[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const isTree = (postorder: number[], rootVal: number, rightIndex: number) => {
    const left = postorder.slice(0, rightIndex);
    const right = postorder.slice(rightIndex, -1);
    return (
      left.every((item) => item < rootVal) &&
      right.every((item) => item > rootVal)
    );
  };
  const rightIndex = upper(
    postorder.slice(0, -1),
    postorder[postorder.length - 1]
  );
  const flag = isTree(postorder, postorder[postorder.length - 1], rightIndex);
  if (flag) {
    return (
      verifyPostorder(postorder.slice(0, rightIndex)) &&
      verifyPostorder(postorder.slice(rightIndex, -1))
    );
  }
  return false;
}

// map



// leetcode sliding-window 6-7

export function moveStones(nums: number[]) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const max =
    nums[n - 1] -
    nums[0] +
    1 -
    n -
    Math.min(nums[n - 1] - nums[n - 2] - 1, nums[1] - nums[0] - 1);
  let min = Infinity;
  let r = 0;
  for (let l = 0; l < n; l++) {
    while (r + 1 < n && nums[r + 1] - nums[l] + 1 <= n) {
      r++;
    }
    let res = n - r + l - 1;
    if (r - l + 1 === n - 1 && nums[r] - nums[l] + 1 === n - 1) {
      res = 2;
    }
    min = Math.min(res, min);
  }
  return [min, max];
}

export function maxSatisfied(
  customers: number[],
  grumpy: number[],
  minutes: number
) {
  let base = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) base += customers[i];
  }
  let increase = 0;
  for (let i = 0; i < minutes; i++) {
    increase += customers[i] * grumpy[i];
  }
  let maxIncrease = increase;
  for (let i = minutes; i < customers.length; i++) {
    increase =
      increase -
      customers[i - minutes] * grumpy[i - minutes] +
      customers[i] * grumpy[i];
    maxIncrease = Math.max(maxIncrease, increase);
  }
  return base + maxIncrease;
}
