// 35

export class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

export function copyRandomList(head: ListNode | null) {
  if (!head) return head;
  const visited = new Map<ListNode | null, ListNode | null>();
  visited.set(null, null);
  const dfs = (node: ListNode) => {
    const newNode = new ListNode(node.val);
    visited.set(node, newNode);
    if (node.next && !visited.has(node.next)) {
      dfs(node.next);
    }
    newNode.next = visited.get(node.next) as ListNode | null;
    if (node.random && !visited.has(node.random)) {
      dfs(node.random);
    }
    newNode.random = visited.get(node.random) as ListNode | null;
  };
  dfs(head);
  return visited.get(head);
}

// quick sort
export function quickSort(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  };

  const getRandom = (l: number, r: number) =>
    Math.floor(l + Math.random() * (r - l + 1));

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[l] > arr[i]) {
        i++;
      }
      while (i <= j && arr[l] < arr[j]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i--;
      j++;
    }
    swap(arr, l, j);
    return j;
  };

  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(arr: number[]) {
  const res = [...arr];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };

  const getRandom = (l: number, r: number) =>
    Math.floor(l + Math.random() * (r - l + 1));

  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let left = l,
      i = l + 1,
      right = r + 1;
    while (i < r) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, i, left);
        i++;
      } else if (arr[i] > arr[l]) {
        right--;
        swap(arr, i, right);
      } else {
        i++;
      }
    }
    swap(arr, l, left);
    return {
      left: left - 1,
      right,
    };
  };
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const res = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return nums[k];
    const p = partition(arr, l, r);
    if (p === k) {
      return arr[p];
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[l] > arr[i]) {
        i++;
      }
      while (i <= j && arr[l] < arr[j]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i--;
      j++;
    }
    swap(arr, l, j);
    return j;
  };
  return sortArr(res, 0, res.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums;
  const res = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) => {
    return Math.floor(l + Math.random() * (r - l + 1));
  };
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[l] > arr[i]) {
        i++;
      }
      while (i <= j && arr[l] > arr[j]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };
}
