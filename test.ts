// 13
export const movingCount = (m: number, n: number, k: number) => {
  let res = 0;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number) => {
    res++;
    map[r][c] = true;
    [
      [r - 1, c],
      [r + 1, c],
      [r, c - 1],
      [r, c + 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR
          .toString()
          .split("")
          .map((v) => parseInt(v))
          .reduce((x, y) => x + y) +
          nextC
            .toString()
            .split("")
            .map((v) => parseInt(v))
            .reduce((x, y) => x + y) <=
          k &&
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !map[nextR][nextC]
      ) {
        dfs(nextR, nextC);
      }
    });
  };
  dfs(0, 0);
  return res;
};

// 14
export const cuttingRope = (n: number) => {
  const compute = (m: number) => {
    const floor = Math.floor(n / m);
    const ceil = Math.ceil(n / m);
    return Math.max(
      floor ** (m - 1) * (n - (m - 1) * floor),
      ceil ** (m - 1) * (n - (m - 1) * ceil)
    );
  };
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = Math.max(res, compute(i));
  }
  return res;
};

// mergesort

export const mergeSort = (arr: number[]) => {
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
    }
  };
  const res = [...arr];
  const temp = [...arr];
  sortArr(res, 0, res.length - 1, temp);
  return res;
};

export const reversePairs = (arr: number[]) => {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        res++;
      }
    }
  }
  return res;
};

export const reversePairs1 = (arr: number[]) => {
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = 0; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        res += mid - i + 1;
        arr[k] = temp[j];
        j++;
      }
    }
  };
  let res = 0;
  sortArr([...arr], 0, arr.length - 1, [...arr]);
  return res;
};

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

export const merge = (l1: ListNode | null, l2: ListNode | null) => {
  const res = new ListNode(-1);
  let p = res;
  let p1 = l1;
  let p2 = l2;
  while (p1 && p2) {
    if (p1.val <= p2.val) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }
  if (p1) p.next = p1;
  if (p2) p.next = p2;
  return res.next;
};
