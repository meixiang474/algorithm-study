// offer 10-I
export function fib(n: number) {
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// quick sort
export function quickSort(nums: number[]) {
  const res = [...nums];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (i <= j && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, j, l);
    return j;
  };
  sortArr(res, 0, res.length - 1);
  return res;
}

export function quickSort1(nums: number[]) {
  const res = [...nums];
  const sortArr = (arr: number[], l: number, r: number) => {
    if (l >= r) return;
    const { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let i = l + 1,
      left = l,
      right = r + 1;
    while (i < right) {
      if (arr[l] > arr[i]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[l] < arr[i]) {
        right--;
        swap(arr, right, i);
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
  sortArr(res, 0, res.length - 1);
  return res;
}

export function sortColors(colors: (1 | 2 | 0)[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let l = -1,
    i = 0,
    r = colors.length;
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(colors, l, i);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(colors, r, i);
    } else {
      i++;
    }
  }
  return colors;
}

// backtracking 1 - 5
export function letterCombinations(digits: string) {
  if (digits.length === 0) return [];
  const res: string[] = [];
  const arr = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  const dfs = (path: string, index: number) => {
    if (index === digits.length) {
      res.push(path);
      return;
    }
    const current = arr[parseInt(digits[index])];
    for (let i = 0; i < current.length; i++) {
      const char = current[i];
      dfs(path + char, index + 1);
    }
  };
  dfs("", 0);
  return res;
}

export function generateParenthesis(n: number) {
  if (n === 0) return [];
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length === n * 2) {
      res.push(path);
      return;
    }
    if (open < n) {
      dfs(path + "(", open + 1, close);
    }
    if (close < open) {
      dfs(path + ")", open, close + 1);
    }
  };
  dfs("", 0, 0);
  return res;
}

export function permuteUnique(nums: number[]) {
  if (nums.length === 0) return [];
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  const set = new Set<number>();
  const dfs = (path: number[]) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i - 1] === nums[i] && set.has(i - 1)) continue;
      if (!set.has(i)) {
        set.add(i);
        dfs(path.concat(nums[i]));
        set.delete(i);
      }
    }
  };
  dfs([]);
  return res;
}

export function getPermutation(n: number, k: number) {
  let groupNum = 1;
  for (let i = 1; i <= n; i++) {
    groupNum *= i;
  }
  const dfs = (path: number[]): string => {
    if (path.length === n) return path.join("");
    groupNum = groupNum / n - path.length;
    for (let i = 1; i <= n; i++) {
      if (path.includes(i)) continue;
      if (k > groupNum) {
        k -= groupNum;
        continue;
      }
      return dfs(path.concat(i));
    }
    return "";
  };
  return dfs([]);
}

export function combine(n: number, k: number) {
  const res: number[][] = [];
  const dfs = (path: number[], start: number) => {
    if (path.length === k) {
      res.push(path);
      return;
    }
    if (path.length + n - start + 1 < k) {
      return;
    }
    for (let i = start; i <= n; i++) {
      dfs(path.concat(i), i + 1);
    }
  };
  dfs([], 1);
  return res;
}
