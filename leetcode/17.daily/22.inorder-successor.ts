// 面试题 04.06. 后继者

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val: number) {
    this.val = val
    this.left = null;
    this.right = null
  }
}

export default function inorderSuccessor(root: TreeNode | null, p: TreeNode) {
  if(!root) return null
    let res = null
    let isNext = false
    const dfs = (node: TreeNode) => {
        if(node.left) dfs(node.left)
        if(isNext) {
            res = node
            isNext = false
        }
        if(node.val === p.val) {
            isNext = true
        }
        if(node.right) dfs(node.right)
    }
    dfs(root)
    return res
}