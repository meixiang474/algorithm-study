// offer 14-I
export function cuttingRope(n: number) {
  const compute = (n: number, m: number) => {
    const floor = Math.floor(n / m);
    const ceil = Math.ceil(n / m);
    return Math.max(
      floor ** (m - 1) * (n - (m - 1) * floor),
      ceil ** (m - 1) * (n - (m - 1) * ceil)
    );
  };
  let res = 0;
  for (let i = 2; i <= n; i++) {
    res = Math.max(res, compute(n, i));
  }
  return res;
}

// graph
export function bfs(
  graph: Record<number, number[]>,
  visited: Set<number>,
  node: number
) {
  const queue: number[] = [node];
  visited.add(node);
  while (queue.length) {
    const current = queue.shift()!;
    console.log(current);
    graph[current].forEach((item) => {
      if (!visited.has(item)) {
        visited.add(item);
        queue.push(item);
      }
    });
  }
}

export function dfs(
  graph: Record<number, number[]>,
  visited: Set<number>,
  node: number
) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(graph, visited, item);
    }
  });
}

// hashtable 1 - 5
export function twoSum1(nums: number[], target: number) {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const rest = target - current;
    if (map.has(rest)) {
      return [i, map.get(rest)];
    }
    map.set(current, i);
  }
}

export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let res = 0;
  let l = 0,
    r = 0;
  while (r < s.length) {
    const current = s[r];
    if (map.has(current) && map.get(current)! >= l) {
      l = map.get(current)! + 1;
    }
    res = Math.max(res, r - l + 1);
    map.set(current, r);
    r++;
  }
  return res;
}

export function fourSum(nums: number[], target: number) {
  nums.sort((a, b) => a - b);
  const res: number[][] = [];
  for (let i = 0; i < nums.length - 3; i++) {
    const current = nums[i];
    if (i > 0 && nums[i - 1] === current) continue;
    if (current + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
    if (
      current +
        nums[nums.length - 1] +
        nums[nums.length - 2] +
        nums[nums.length - 3] <
      target
    )
      continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      const currentj = nums[j];
      if (j > i + 1 && nums[j - 1] === currentj) continue;
      if (current + currentj + nums[j + 1] + nums[j + 2] > target) break;
      if (
        current + currentj + nums[nums.length - 1] + nums[nums.length - 2] <
        target
      )
        continue;
      let l = j + 1,
        r = nums.length - 1;
      while (l < r) {
        const currentl = nums[l];
        const currentr = nums[r];
        const sum = current + currentj + currentl + currentr;
        if (sum === target) {
          res.push([current, currentj, currentl, currentr]);
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        } else if (sum < target) {
          while (l < r) {
            l++;
            if (nums[l] !== currentl) break;
          }
        } else {
          while (l < r) {
            r--;
            if (nums[r] !== currentr) break;
          }
        }
      }
    }
  }
  return res;
}

export function isValidSudoku(board: string[][]) {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const rows: number[][] = new Array(m).fill(0).map(() => new Array(9).fill(0));
  const cols: number[][] = new Array(n).fill(0).map(() => new Array(9).fill(0));
  const subs: number[][][] = new Array(3)
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const current = board[r][c];
      if (current !== ".") {
        const index = parseInt(current) - 1;
        rows[r][index]++;
        cols[c][index]++;
        subs[Math.floor(r / 3)][Math.floor(c / 3)][index]++;
        if (
          rows[r][index] > 1 ||
          cols[c][index] > 1 ||
          subs[Math.floor(r / 3)][Math.floor(c / 3)][index] > 1
        )
          return false;
      }
    }
  }
  return true;
}

export function groupAnagrams(strs: string[]) {
  const map = new Map<string, string[]>();
  for (let item of strs) {
    const str = item.split("").sort().join("");
    const arr = map.has(str) ? map.get(str)! : [];
    arr.push(str);
    if (!map.has(str)) {
      map.set(str, arr);
    }
  }
  const res: string[][] = [];
  map.forEach((item) => {
    res.push(item);
  });
  return res;
}
