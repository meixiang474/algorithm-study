// 36

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

export function treeToDoublyList(root: TreeNode | null) {
  if (!root) return null;
  const res: TreeNode[] = [];
  const dfs = (node: TreeNode) => {
    if (node.left) {
      dfs(node.left);
    }
    res.push(node);
    if (node.right) {
      dfs(node.right);
    }
  };
  dfs(root);
  let head = null;
  let tail = null;
  for (let i = 0; i < res.length; i++) {
    if (tail == null) {
      head = tail = res[i];
      head.right = tail;
      tail.left = head;
    } else {
      const current = res[i];
      const prev = tail;
      prev.right = current;
      current.left = prev;
      current.right = head;
      tail = current;
      head!.left = tail;
    }
  }
  return head;
}

// binary search
export function binarySearch(arr: number[], target: number) {
  const search = (
    arr: number[],
    l: number,
    r: number,
    target: number
  ): number => {
    if (l > r) {
      return -1;
    }
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      return search(arr, l, mid - 1, target);
    } else {
      return search(arr, mid + 1, r, target);
    }
  };
  return search(arr, 0, arr.length - 1, target);
}

export function binarySearch1(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return -1;
}

// > target的第一个
export function upper(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] <= target) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

// = target的最后一个或者 > target的第一个
export function ceil(arr: number[], target: number) {
  const index = upper(arr, target);
  if (index - 1 >= 0 && arr[index - 1] === target) {
    return index - 1;
  }
  return index;
}

// = target第一个或者 > target第一个
export function lowerCeil(arr: number[], target: number) {
  let l = 0,
    r = arr.length;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (arr[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return l;
}

// < target得第一个
export function lower(arr: number[], target: number) {
  let l = -1,
    r = arr.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (arr[mid] < target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}

// = target的最后一个，< target的第一个
export function upperFloor(arr: number[], target: number) {
  let l = -1,
    r = arr.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (arr[mid] <= target) {
      l = mid;
    } else {
      r = mid + 1;
    }
  }
  return l;
}

// < target得第一个，= target得第一个
export function lowerFloor(arr: number[], target: number) {
  const index = lower(arr, target);
  if (index + 1 < arr.length && arr[index + 1] === target) {
    return index + 1;
  }
  return index;
}

export function fn(x: number) {
  let l = 0,
    r = x;
  while (l < r) {
    const mid = Math.floor(l + (r - l + 1) / 2);
    if (mid ** 2 === x) {
      return mid;
    } else if (mid ** 2 <= x) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  return l;
}
