// leetcode 436

export default function findRightInterval(intervals: number[][]): number[] {
  const startArr: [number, number][] = intervals
    .map<[number, number]>((item, index) => [item[0], index])
    .sort((a, b) => a[0] - b[0]);
  const ceil = (data: [number, number][], target: number) => {
    let l = 0,
      r = data.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (data[mid][0] >= target) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l === data.length ? -1 : data[l][1];
  };
  return intervals.map((item) => {
    return ceil(startArr, item[1]);
  });
}
