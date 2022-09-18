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

// offer 56-II 57-II
export function singleNumber(nums: number[]) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  for (let [key, value] of map) {
    if (value === 1) return key;
  }
}

export function findSequence(target: number) {
  const res: number[][] = [];
  let l = 1,
    r = 2;
  while (l < r) {
    const sum = ((l + r) * (r - l + 1)) / 2;
    if (sum === target) {
      const arr = [];
      for (let i = l; i <= r; i++) {
        arr.push(i);
      }
      res.push(arr);
      l++;
    } else if (sum < target) {
      r++;
    } else {
      l++;
    }
  }
  return res;
}

// binary search
// todo
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

export function exist(board: string[][], word: string) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length) return true;
    const temp = board[r][c];
    board[r][c] = "";
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === word[index]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    board[r][c] = temp;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 1);
        if (res) return true;
      }
    }
  }
  return false;
}

export function subsetsWithDup(nums: number[]) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const dfs = (path: number[], index: number, length: number) => {
    if (path.length === length) {
      res.push(path);
      return;
    }
    if (path.length + nums.length - index < length) return;
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i - 1] === nums[i]) continue;
      dfs(path.concat(nums[i]), i + 1, length);
    }
  };
  for (let i = 0; i <= nums.length; i++) {
    dfs([], 0, i);
  }
  return res;
}

export function restoreIpAddresses(s: string) {
  const ips: string[] = [];
  const res: string[] = [];
  const dfs = (ipIndex: number, index: number) => {
    if (ipIndex === 4) {
      if (index === s.length) {
        res.push(ips.join("."));
      }
      return;
    }
    if (index === s.length) return;
    if (s[index] === "0") {
      ips[ipIndex] = "0";
      dfs(ipIndex + 1, index + 1);
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      const current = item * 10 + parseInt(s[i]);
      if (current > 0 && current <= 255) {
        ips[ipIndex] = current.toString();
        dfs(ipIndex + 1, i + 1);
      } else {
        break;
      }
    }
  };
  dfs(0, 0);
  return res;
}
