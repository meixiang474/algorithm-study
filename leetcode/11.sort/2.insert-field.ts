// leetcode 57

export default function insertField(
  intervals: number[][],
  newInterval: number[]
) {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let prevEnd = -Infinity;
  for (let i = 0; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (prevEnd >= start) {
      res.splice(res.length - 1, 1, [
        res[res.length - 1][0],
        Math.max(prevEnd, end),
      ]);
    } else {
      res.push([start, end]);
    }
    prevEnd = Math.max(prevEnd, end);
  }
  return res;
}
