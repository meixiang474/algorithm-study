// 210

export default function findOrder(
  numCourses: number,
  prerequisites: number[][]
): number[] {
  const inDegree: number[] = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++;
    if (map.has(prerequisites[i][1])) {
      map.get(prerequisites[i][1])?.push(prerequisites[i][0]);
    } else {
      map.set(prerequisites[i][1], [prerequisites[i][0]]);
    }
  }
  const queue: number[] = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }
  const res: number[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    res.push(current);
    const arr = map.get(current);
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        inDegree[arr[i]]--;
        if (inDegree[arr[i]] === 0) {
          queue.push(arr[i]);
        }
      }
    }
  }
  return res.length === numCourses ? res : [];
}
