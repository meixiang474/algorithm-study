export default function merge(intervals: number[][]) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (i > 0 && prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(end, prevEnd),
      ]);
    } else {
      res.push(intervals[i]);
    }
    prevEnd = Math.max(end, prevEnd);
  }
  return res;
}
