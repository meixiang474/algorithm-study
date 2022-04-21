// offer 31


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
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
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
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
    let left = l,
      i = l + 1,
      right = r + 1;
    while (i < right) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[i] > arr[l]) {
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

export function sortColors(colors: number[]) {
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let left = -1,
    right = colors.length,
    i = 0;
  while (i < right) {
    if (i === 0) {
      left++;
      swap(colors, left, i);
      i++;
    } else if (i === 2) {
      right--;
      swap(colors, right, i);
    } else {
      i++;
    }
  }
  return colors;
}

export function findKMax(nums: number[], k: number) {
  k = nums.length - k;
  const arr = [...nums];
  const sortArr = (arr: number[], l: number, r: number): number => {
    if (l >= r) return arr[l];
    const p = partition(arr, l, r);
    if (p === k) {
      return arr[k];
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
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
    swap(arr, l, j);
    return j;
  };
  return sortArr(arr, 0, arr.length - 1);
}

export function findKMin(nums: number[], k: number) {
  if (k >= nums.length) return nums;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return nums.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return nums.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, l, p);
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
    swap(arr, l, j);
    return j;
  };
  return sortArr([...nums], 0, nums.length - 1);
}

// leetcode dp 6-10
export function numDecoding(s: string) {
  if (s.length === 0) return 0;
  const dp = [1];
  dp[1] = s[0] === "0" ? 0 : 1;
  for (let i = 2; i <= s.length; i++) {
    dp[i] =
      (s[i - 1] === "0" ? 0 : dp[i - 1]) +
      (s[i - 2] === "0" || parseInt(s[i - 2] + s[i - 1]) > 26 ? 0 : dp[i - 2]);
  }
  return dp[s.length];
}

export function numTrees(n: number) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    if (dp[i] == null) {
      dp[i] = 0;
    }
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
}

export function minimumTotal(triangle: number[][]) {
  const dp: number[][] = Array.from({ length: triangle.length }, () =>
    new Array(triangle.length).fill(Infinity)
  );
  dp[0][0] = triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    dp[i][0] = dp[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
    }
    dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
  }
  return Math.min(...dp[triangle.length - 1]);
}

export function maxProfit(prices: number[]) {
  const dp = [0];
  let min = prices[0];
  for (let i = 1; i <= prices.length; i++) {
    const current = prices[i - 1];
    const profit = current - min;
    dp[i] = Math.max(dp[i - 1], profit);
    min = Math.min(min, current);
  }
  return dp[prices.length];
}

export function maxProduct(nums: number[]) {
  const dpMax = [nums[0]];
  const dpMin = [nums[0]];
  for (let i = 1; i < nums.length; i++) {
    dpMax[i] = Math.max(
      dpMax[i - 1] * nums[i],
      dpMin[i - 1] * nums[i],
      nums[i]
    );
    dpMin[i] = Math.min(
      dpMin[i - 1] * nums[i],
      dpMax[i - 1] * nums[i],
      nums[i]
    );
  }
  return Math.max(...dpMax);
}
