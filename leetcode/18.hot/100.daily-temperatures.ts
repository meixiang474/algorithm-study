// leetcode 739

export default function dailyTemperatures(temperatures: number[]) {
  const res: number[] = new Array(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    const current = temperatures[i];
    while (stack.length && current > temperatures[stack[stack.length - 1]]) {
      const index = stack.pop()!;
      res[index] = i - index;
    }
    stack.push(i);
  }
  return res;
}
