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

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// offer 55-II 56-I
export function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  const getDepth = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
  };
  return (
    Math.abs(getDepth(root.left) - getDepth(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

export function singleNumbers(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const res: number[] = [];
  map.forEach((val, key) => {
    if (val === 1) res.push(key);
  });
  return res;
}

// quick sort
export function quickSort(nums: number[]) {
  const sortArr = (nums: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(nums, l, r);
    sortArr(nums, l, p - 1);
    sortArr(nums, p + 1, r);
  };
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (j >= i && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, l, j);
    return j;
  };
  const res = [...nums];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(nums: number[]) {
  const sortArr = (nums: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(nums, l, r);
    sortArr(nums, l, left);
    sortArr(nums, right, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let left = l,
      right = r + 1,
      i = l + 1;
    while (i < right) {
      if (nums[i] < nums[l]) {
        left++;
        swap(nums, left, i);
        i++;
      } else if (nums[i] > nums[l]) {
        right--;
        swap(nums, right, i);
      } else {
        i++;
      }
    }
    swap(nums, l, left);
    return {
      left: left - 1,
      right,
    };
  };
  const res = [...nums];
  sortArr(res, 0, res.length - 1);
  return res;
}

export function sortColors(nums: number[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let l = -1,
    r = nums.length,
    i = 0;
  while (i < r) {
    if (nums[i] === 0) {
      l++;
      swap(nums, l, i);
      i++;
    } else if (nums[i] === 2) {
      r--;
      swap(nums, r, i);
    } else {
      i++;
    }
  }
  return nums;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const sortArr = (nums: number[], l: number, r: number): number => {
    if (l >= r) return nums[k];
    const p = partition(nums, l, r);
    if (p === k) return nums[p];
    if (p > k) return sortArr(nums, l, p - 1);
    if (p < k) return sortArr(nums, p + 1, r);
    return 0;
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (j >= i && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (nums.length <= k) return nums.slice(0, k);
  const sortArr = (nums: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(nums, l, r);
    if (p === k) {
      return nums.slice(0, k);
    } else if (p > k) {
      return sortArr(nums, l, p - 1);
    } else {
      return sortArr(nums, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (nums: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(nums, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && nums[i] < nums[l]) {
        i++;
      }
      while (j >= i && nums[j] > nums[l]) {
        j--;
      }
      if (i >= j) break;
      swap(nums, i, j);
      i++;
      j--;
    }
    swap(nums, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

// hot 41 - 44
export function levelOrder(root: TreeNode | null) {
  if (!root) return [];
  const res: number[][] = [];
  const queue: [TreeNode, number][] = [[root, 0]];
  while (queue.length > 0) {
    const [current, level] = queue.shift()!;
    const arr = res[level] || (res[level] = []);
    arr.push(current.val);
    if (current.left) queue.push([current.left, level + 1]);
    if (current.right) queue.push([current.right, level + 1]);
  }
  return res;
}

export function maxDepth(root: TreeNode | null) {
  if (!root) return 0;
  let res = 0;
  const dfs = (node: TreeNode, level: number) => {
    if (!node.left && !node.right) {
      res = Math.max(res, level);
      return;
    }
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  };
  return res;
}

export function buildTree(preorder: number[], inorder: number[]) {
  if (preorder.length === 0 || inorder.length === 0) return null;
  const rootValue = preorder[0];
  const rootIndex = inorder.indexOf(rootValue);
  const root = new TreeNode(rootValue);
  root.left = buildTree(
    preorder.slice(1, rootIndex + 1),
    inorder.slice(0, rootIndex)
  );
  root.right = buildTree(
    preorder.slice(rootIndex + 1),
    inorder.slice(rootIndex + 1)
  );
  return root;
}

export function flatten(root: TreeNode | null) {
  if (!root) return null;
  const dummyHead = new TreeNode(-1);
  let p = dummyHead;
  const dfs = (node: TreeNode) => {
    const left = node.left;
    const right = node.right;
    node.left = null;
    node.right = null;
    p.right = node;
    p = p.right;
    if (left) dfs(left);
    if (right) dfs(right);
  };
  dfs(root);
}

// backtracking 6-10
export function subsets(nums: number[]) {
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}
// todo
