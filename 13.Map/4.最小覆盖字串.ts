// 76

function fn(s: string, t: string): string {
  let l = 0;
  let r = 0;
  const need = new Map<string, number>();
  for (let current of t) {
    need.set(
      current,
      need.has(current) ? (need.get(current) as number) + 1 : 1
    );
  }
  let needType = need.size;
  let res = '';
  while (r < s.length) {
    const current = s[r];
    if (need.has(current)) {
      need.set(current, (need.get(current) as number) - 1);
      if (need.get(current) === 0) {
        needType -= 1;
      }
    }
    while (needType === 0) {
      const newRes = s.substring(l, r + 1);
      if (!res || newRes.length < res.length) res = newRes;
      const currentl = s[l];
      if (need.has(currentl)) {
        need.set(currentl, (need.get(currentl) as number) + 1);
        if (need.get(currentl) === 1) {
          needType += 1;
        }
      }
      l += 1;
    }
    r += 1;
  }
  return res;
}
