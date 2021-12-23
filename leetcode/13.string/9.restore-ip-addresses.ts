// leetcode 93

export default function restoreIpAddresses(s: string) {
  const res: string[] = [];
  const dfs = (path: string[], index: number) => {
    if (path.length === 4) {
      if (index === s.length) {
        res.push(path.join("."));
      }
      return;
    }
    if (index === s.length) {
      return;
    }
    if (s[index] === "0") {
      dfs(path.concat("0"), index + 1);
      return;
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      item = item * 10 + parseInt(s[i]);
      if (item > 0 && item <= 255) {
        dfs(path.concat(item + ""), i + 1);
      } else {
        break;
      }
    }
  };
  dfs([], 0);
  return res;
}
