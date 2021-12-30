/**
 * @description 剑指offer 68-I
 */

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

export function lowestCommon(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
) {
  const getPath = (node: TreeNode | null) => {
    const res: TreeNode[] = [];
    let current = root;
    while (current !== node && node && current) {
      res.push(current);
      if (current.val > node.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    res.push(current!)
    return res;
  };
  const pList = getPath(p);
  const qList = getPath(q);
  let res = null;
  for (let i = 0; i < pList.length && i < qList.length; i++) {
    if (pList[i] === qList[i]) {
      res = pList[i];
    } else {
      break;
    }
  }
  return res;
}

1
23
456

1 
12