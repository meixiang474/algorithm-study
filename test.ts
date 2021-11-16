// offer 55-II

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

export function isBalanced(root: TreeNode | null): boolean {
  if (!root) return true;
  const depth = (node: TreeNode | null): number => {
    if (!node) return 0;
    return Math.max(depth(node.left), depth(node.right)) + 1;
  };
  return (
    Math.abs(depth(root.left) - depth(root.right)) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
}

// search sort

export function isObject(obj: any) {
  return obj && typeof obj === "object";
}

export function isEqual(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) return a === b;
  const lenA = Object.keys(a).length;
  const lenB = Object.keys(b).length;
  if (lenA !== lenB) return false;
  for (let key in a) {
    if (a.hasOwnproperty(key)) {
      const flag = isEqual(a[key], b[key]);
      if (!flag) return false;
    }
  }
  return true;
}

export function linearSearch(data: any[], target: any) {
  for (let i = 0; i < data.length; i++) {
    const current = data[i];
    if (isEqual(current, target)) {
      return i;
    }
  }
  return -1;
}

export function selectionSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < res.length; j++) {
      minIndex = res[j] < res[minIndex] ? j : minIndex;
    }
    if (minIndex !== i) {
      swap(res, minIndex, i);
    }
  }
  return res;
}

export function insertionSort(arr: number[]) {
  const res = [...arr];
  for (let i = 0; i < res.length; i++) {
    const current = res[i];
    let swapIndex = i;
    for (let j = i - 1; j >= 0; j--) {
      if (res[j] > current) {
        res[j + 1] = res[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      res[swapIndex] = current;
    }
  }
  return res;
}

export function bubbleSort(arr: number[]) {
  const res = [...arr];
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  for (let i = 0; i < res.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < res.length - i - 1; j++) {
      if (res[j + 1] < res[j]) {
        flag = true;
        swap(arr, i, j);
      }
    }
    if (!flag) break;
  }
  return res;
}
