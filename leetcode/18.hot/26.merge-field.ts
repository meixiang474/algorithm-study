// leetcode 56

export default function mergeField(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  let prevEnd = -Infinity;
  const res: number[][] = [];
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][start],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push(intervals[i]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}
