// leetcode 399

export default function calcEqualtion(
  equations: string[][],
  values: number[],
  queries: string[][]
) {
  let nodeCount = 0;
  const map = new Map<string, number>();
  for (let i = 0; i < equations.length; i++) {
    if (!map.has(equations[i][0])) {
      map.set(equations[i][0], nodeCount++);
    }
    if (!map.has(equations[i][1])) {
      map.set(equations[i][1], nodeCount++);
    }
  }
  const graph: [number, number][][] = new Array(nodeCount).fill(null);
  for(let i = 0; i < graph.length; i++) {
    graph[i] = []
  }
  for (let i = 0; i < equations.length; i++) {
    const node1 = map.get(equations[i][0])!;
    const node2 = map.get(equations[i][1])!;
    graph[node1].push([node2, values[i]]);
    graph[node2].push([node1, 1 / values[i]]);
  }
  const res: number[] = [];
  for (let i = 0; i < queries.length; i++) {
    const node1 = map.get(queries[i][0]);
    const node2 = map.get(queries[i][1]);
    if (node1 == null || node2 == null) {
      res[i] = -1;
      continue;
    }
    if (node1 === node2) {
      res[i] = 1;
      continue;
    }
    const queue = [node1];
    const ratios = new Array(nodeCount).fill(-1);
    ratios[node1] = 1;
    while (queue.length > 0 && ratios[node2] === -1) {
      const current = queue.shift()!;
      for (let i = 0; i < graph[current].length; i++) {
        const [node, value] = graph[current][i];
        if (ratios[node] === -1) {
          ratios[node] = value * ratios[current];
          queue.push(node);
        }
      }
    }
    res[i] = ratios[node2];
  }
  return res;
}