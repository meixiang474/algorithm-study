import graph from './index';

const visited: Set<number> = new Set();
// 将起始节点加进去
visited.add(2);
const queue: number[] = [2];

while (queue.length) {
  const current = queue.shift()!;
  console.log(current);
  graph[current].forEach((item) => {
    if (!visited.has(item)) {
      queue.push(item);
      visited.add(current);
    }
  });
}
