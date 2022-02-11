// leetcode 99

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export default function recoverTree(root: TreeNode | null): void {
  const inorder = (node: TreeNode | null, nums: number[]) => {
    if (!node) return;
    inorder(node.left, nums);
    nums.push(node.val);
    inorder(node.right, nums);
  };
  const findTwo = (nums: number[]) => {
    let x = null,
      y = null;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i + 1] < nums[i]) {
        y = nums[i + 1];
        if (x == null) {
          x = nums[i];
        } else {
          break;
        }
      }
    }
    return [x, y] as [number, number];
  };
  const recover = (
    node: TreeNode | null,
    count: number,
    x: number,
    y: number
  ) => {
    if (node) {
      if (node.val === x || node.val === y) {
        node.val = node.val === x ? y : x;
        count--;
        if (count === 0) {
          return;
        }
      }
      recover(node.left, count, x, y);
      recover(node.right, count, x, y);
    }
  };
  const nums: number[] = [];
  inorder(root, nums);
  const [x, y] = findTwo(nums);
  recover(root, 2, x, y);
}
