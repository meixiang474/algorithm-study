// leetcode 207

export default function canFinish(
  numCourses: number,
  prerequisites: number[][]
) {
  const degree = new Array(numCourses).fill(0);
  const map = new Map<number, number[]>();
  for (let [course1, course2] of prerequisites) {
    degree[course1]++;
    if (map.has(course2)) {
      map.get(course2)!.push(course1);
    } else {
      map.set(course2, [course1]);
    }
  }
  let count = 0;
  const queue: number[] = [];
  for (let i = 0; i < degree.length; i++) {
    if (degree[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length) {
    const current = queue.shift()!;
    count++;
    const arr = map.get(current);
    if (arr && arr.length) {
      for (let item of arr) {
        degree[item]--;
        if (degree[item] === 0) {
          queue.push(item);
        }
      }
    }
  }
  return count === numCourses;
}
