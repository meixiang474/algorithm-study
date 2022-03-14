// offer 21
export function exchange(nums: number[]) {
  const res: number[] = [];
  for (let item of nums) {
    if (item % 2 === 0) {
      res.push(item);
    } else {
      res.unshift(item);
    }
  }
  return res;
}

// union-find


// string 1-5
export function longestSubstring(s: string) {
  const map = new Map<string, number>();
  let l = 0,
    r = 0;
  let res = 0;
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

export function letterCombinations(digits: string) {
  if (!digits) return [];
  const map: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  const res: string[] = [];
  const dfs = (path: string, index: number) => {
    if (index >= digits.length) {
      res.push(path);
      return;
    }
    const currentArr = map[digits[index]];
    for (let item of currentArr) {
      dfs(path + item, index + 1);
    }
  };
  dfs("", 0);
  return res;
}

export function isValid(s: string) {
  if (s.length % 2 !== 0) return false;
  const map = new Map<string, string>();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack: string[] = [];
  for (let item of s) {
    if (map.has(item)) {
      stack.push(item);
    } else {
      const prev = stack.pop();
      if (!prev || map.get(prev) !== item) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

export function generateParenthesis(n: number) {
  if (n === 0) return [];
  const res: string[] = [];
  const dfs = (path: string, open: number, close: number) => {
    if (path.length >= n * 2) {
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

export function strStr(haystack: string, needle: string) {
  if (!needle) return 0;
  if (haystack.length < needle.length) return -1;
  let res = -1;
  for (let index = 0; index < haystack.length; index++) {
    if (haystack.length - index < needle.length) break;
    const current = haystack[index];
    if (current === needle[0]) {
      let flag = true;
      for (let i = index + 1; i < index + needle.length; i++) {
        if (haystack[i] !== needle[i - index]) {
          flag = false;
          break;
        }
      }
      if (flag) {
        res = index;
        break;
      }
    }
  }
  return res;
}
