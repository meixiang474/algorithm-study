// leetcode 253

export default function minMeetingRooms(intervals: number[][]) {
  const map: boolean[] = new Array(intervals.length).fill(false);
  intervals.sort((a, b) => a[0] - b[0]);
  const dfs = (stop: number) => {
    let l = 0,
      r = intervals.length;
    while (l < r) {
      const mid = Math.floor(l + (r - l) / 2);
      if (intervals[mid][0] >= stop) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    while(map[l]) {
      l++
    }
    if (l >= intervals.length) return;
    map[l] = true;
    dfs(intervals[l][1]);
  };
  let res = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (!map[i]) {
      res++;
      dfs(intervals[i][1]);
    }
  }
  return res;
}
