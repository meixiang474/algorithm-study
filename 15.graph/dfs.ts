import graph from "./index";

const visited = new Set<number>();

function dfs(node: number) {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs(item);
    }
  });
}

export const dfs1 = (
  graph: { [key: number]: number[] },
  node: number,
  visited: Set<number>
) => {
  console.log(node);
  visited.add(node);
  graph[node].forEach((item) => {
    if (!visited.has(item)) {
      dfs1(graph, item, visited);
    }
  });
};
