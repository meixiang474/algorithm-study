// 69
export {};
function fn(x: number): number {
  function floor(x: number): number {
    let l = 0,
      r = x;
    while (l < r) {
      let mid = Math.floor(l + (r - l + 1) / 2);
      if (mid ** 2 < x) {
        l = mid;
      } else {
        r = mid - 1;
      }
    }
    return l;
  }
  let res = floor(x);
  if ((res + 1) ** 2 === x) return res + 1;
  return res;
}
