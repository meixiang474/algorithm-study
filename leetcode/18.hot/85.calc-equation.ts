// leetcode 399

export default function calcEquation(equations: string[][], values: number[], queries: string[][]) {
  const map = new Map<string, number>()
  let nodeCount = 0
  for(let i = 0; i < equations.length; i++) {
    const [node1, node2] = equations[i]
    if(!map.has(node1)) {
      map.set(node1, nodeCount++)
    }
    if(!map.has(node2)) {
      map.set(node2, nodeCount++)
    }
  }
  const graph: number[][][] = new Array(nodeCount).fill(null)
  for(let i = 0; i < graph.length; i++) {
    graph[i] = []
  }
  for(let i = 0; i < equations.length; i++) {
    const node1 = map.get(equations[i][0])!
    const node2 = map.get(equations[i][1])!
    graph[node1].push([node2, values[i]])
    graph[node2].push([node1, 1 / values[i]])
  }
  const res: number[] = []
  for(let i = 0; i < queries.length; i++) {
    const node1 = map.get(queries[i][0])
    const node2 = map.get(queries[i][1])
    if(node1 == null || node2 == null) {
      res[i] = -1
      continue
    }
    if(node1 === node2) {
      res[i] = 1
      continue
    }
    const ratios: number[] = new Array(nodeCount).fill(-1)
    ratios[node1] = 1
    const queue: number[] = [node1] 
    while(queue.length && ratios[node2] === -1) {
      const current = queue.shift()!
      const arr = graph[current]
      for(let i = 0; i < arr.length; i++) {
        const [node, value] = arr[i]
        if(ratios[node] === -1) {
          ratios[node] = value * ratios[current]
          queue.push(node)
        }
      }
    }
    res[i] = ratios[node2]
  }
  return res
}