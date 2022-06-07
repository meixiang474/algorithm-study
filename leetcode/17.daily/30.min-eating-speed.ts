// leetcode 875

export default function minEatingSpeed(piles: number[], h: number): number {
  const getTime = (speed: number) => {
    let res = 0;
    for (let i = 0; i < piles.length; i++) {
      res += Math.ceil(piles[i] / speed);
    }
    return res;
  };
  let l = 1,
    r = Math.max(...piles);
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    const time = getTime(mid);
    if (time > h) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}
