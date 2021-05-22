/**
 * @description 剑指offer33
 */

export default function verifyPostorder(postorder: number[]): boolean {
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
  const rootVal = postorder[postorder.length - 1];
  const rightIndex = upper(postorder.slice(0, -1), rootVal);
  const flag = isTree(postorder, rootVal, rightIndex);
  if (flag) {
    return (
      verifyPostorder(postorder.slice(0, rightIndex)) &&
      verifyPostorder(postorder.slice(rightIndex, -1))
    );
  } else {
    return false;
  }
}
