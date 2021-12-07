// leetcode 682

export default function calPoints(ops: string[]) {
  const stack: number[] = []
  for(let item of ops) {
    switch(item) {
      case 'C':
        stack.pop()
        break;
      case 'D':
        stack.push(stack[stack.length - 1] * 2)
        break;
      case '+':
        stack.push(stack[stack.length - 1] + stack[stack.length - 2])
        break;
      default:
        stack.push(parseFloat(item));
        break;
    }
  }
  return stack.reduce((memo, current) => memo + current)
}