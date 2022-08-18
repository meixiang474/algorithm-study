// leetcode 621

export default function leastInterval(tasks: string[], n: number) {
  const map = new Map<string, number>();
  for (let item of tasks) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const rest = Array.from(map).map((item) => item[1]);
  const valid: number[] = new Array(rest.length).fill(1);
  let time = 0;
  for (let i = 0; i < tasks.length; i++) {
    let minNextValid = Infinity;
    for (let j = 0; j < valid.length; j++) {
      if (rest[j] > 0) {
        minNextValid = Math.min(minNextValid, valid[j]);
      }
    }
    time = Math.max(time + 1, minNextValid);
    let best = -1;
    for (let j = 0; j < rest.length; j++) {
      if (rest[j] > 0 && valid[j] <= time) {
        if (best === -1 || rest[best] < rest[j]) {
          best = j;
        }
      }
    }
    valid[best] = time + n + 1;
    rest[best] -= 1;
  }
  return time;
}
