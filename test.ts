// 11
export const minArray = (nums: number[]) => {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] < nums[r]) {
      r = mid;
    } else if (nums[mid] > nums[r]) {
      l = mid + 1;
    } else {
      r--;
    }
  }
  return nums[l];
};

// 12
export const findPath = (matrix: string[][], word: string) => {
  if (matrix.length === 0 || matrix[0].length === 0) return false;
  const m = matrix.length;
  const n = matrix[0].length;
  const dfs = (r: number, c: number, index: number) => {
    if (index === word.length - 1) {
      return true;
    }
    const temp = matrix[r][c];
    const res = (matrix[r][c] = "");
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        matrix[nextR][nextC] === word[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
    });
    if (res) {
      return true;
    }
    matrix[r][c] = temp;
    return false;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (matrix[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) {
          return true;
        }
      }
    }
  }
  return false;
};
