// leetcode 433

export default function minMutation(
  start: string,
  end: string,
  bank: string[]
) {
  const set = new Set<string>();
  const keys = ["A", "C", "T", "G"];
  for (let item of bank) {
    set.add(item);
  }
  if (start === end) return 0;
  if (!set.has(end)) return -1;
  const queue: string[] = [start];
  set.delete(start);
  let step = 0;
  while (queue.length) {
    step++;
    const length = queue.length;
    for (let i = 0; i < length; i++) {
      let current = queue.shift()!;
      for (let i = 0; i < current.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          if (keys[j] !== current[i]) {
            const newCurrentArr = [...current];
            newCurrentArr[i] = keys[j];
            const newCurrent = newCurrentArr.join("");
            if (set.has(newCurrent)) {
              if (newCurrent === end) return step;
              set.delete(newCurrent);
              queue.push(newCurrent);
            }
          }
        }
      }
    }
  }
  return -1;
}
