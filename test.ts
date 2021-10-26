// offer 53-I
export function search(nums: number[], target: number) {
  const floor = (nums: number[], target: number) => {
    let l = -1,
      r = nums.length - 1;
    while (l < r) {
      const mid = Math.floor(l + (r - l + 1) / 2);
      if (nums[mid] < target) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  };
  const ceil = (nums: number[], target: number) => {
    let l = 0,
      r = nums.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (nums[mid] > target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
  const floorIndex = floor(nums, target);
  const ceilIndex = ceil(nums, target);
  return ceilIndex - floorIndex - 1;
}

// leetcode array 40
export function combinationSum2(candidates: number[], target: number) {
  candidates = candidates.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], sum: number, start: number) => {
    if (sum === target) {
      res.push(path);
      return;
    }
    if (start >= candidates.length) {
      return;
    }
    if (sum > target) return;
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      dfs(path.concat(candidates[i]), sum + candidates[i], i + 1);
    }
  };
  dfs([], 0, 0);
  return res;
}

// BST

export interface Visitor {
  visit: (val: number) => void;
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

export class BST {
  root: TreeNode | null
  size: number;
  constructor() {
    this.root = null
    this.size = 0
  }
  getSize() {
    return this.size
  }
  isEmpty() {
    return this.size === 0
  }
  add(val: number) {
    this.root = this.addNode(this.root, val)
  }
  addNode(node: TreeNode | null, val: number): TreeNode {
    if(!node) {
      this.size++
      return new TreeNode(val)
    }
    if(node.val < val) {
      node.right = this.addNode(node.right, val)
    }else if(node.val > val) {
      node.left = this.addNode(node.left, val)
    }
    return node
  }
  contains(val: number) {
    return this.containsNode(this.root, val)
  }
  containsNode(node: TreeNode | null, val: number): boolean {
    if(!node) return false
    if(node.val === val) return true
    if(node.val < val) {
      return this.containsNode(node.right, val)
    }else {
      return this.containsNode(node.left, val)
    }
  }
  preOrder(visitor: Visitor) {
    this.preOrderNode(this.root, visitor)
  }
  preOrderNode(node: TreeNode | null, visitor: Visitor) {
    if(!node) return
    visitor.visit(node.val)
    this.preOrderNode(node.left, visitor)
    this.preOrderNode(node.right, visitor)
  }
}
