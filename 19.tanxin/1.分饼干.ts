// 455

export function findContentChildren(g: number[], s: number[]) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);
  let res = 0;
  s.forEach((item) => {
    if (item > g[res]) {
      res++;
    }
  });
  return res;
}
