// leetcode 227

export default function calculate(s: string): number {
  const stack: number[] = [];
  s = s.trim();
  let num = 0;
  let prevSign = "+";
  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (!isNaN(Number(current)) && current !== " ") {
      num = num * 10 + Number(current);
    }
    if (isNaN(Number(current)) || i === s.length - 1) {
      switch (prevSign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack.push(stack.pop()! * num);
          break;
        case "/":
          stack.push((stack.pop()! / num) | 0);
          break;
        default:
          break;
      }
      num = 0;
      prevSign = current;
    }
  }
  return stack.reduce((memo, current) => memo + current);
}
