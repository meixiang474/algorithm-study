// leetcode 297

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val
    this.left = null
    this.right = null
  }
}

export function serialize(root: TreeNode | null) {
  if(!root) return 'None'
  let res = ''
  const dfs = (node: TreeNode | null) => {
    if(!node) {
      res += 'None,'
      return
    }
    res += node.val + ','
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return res.slice(0, -1)
}

export function deserialize(s: string) {
  const inorder = s.split(',')
  const dfs = (): TreeNode | null => {
    const first = inorder.shift()
    if(first === 'None') {
      return null
    }
    const root = new TreeNode(parseFloat(first!))
    root.left = dfs()
    root.right = dfs()
    return root
  }
  return dfs()
}