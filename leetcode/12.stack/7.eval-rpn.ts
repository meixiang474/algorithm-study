// leetcode 150

export default function evalRPN(tokens: string[]): number {
  const stack: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i];
    if (isNaN(parseInt(current))) {
      const n1 = stack.pop()!;
      const n2 = stack.pop()!;
      let res: number = eval(`${n2} ${current} ${n1}`);
      res = res > 0 ? Math.floor(res) : Math.ceil(res);
      stack.push(res + "");
    } else {
      stack.push(current);
    }
  }
  return parseInt(stack[0]);
}
