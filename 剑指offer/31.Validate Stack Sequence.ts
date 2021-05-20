export default function validateStackSequence(
  pushed: number[],
  popped: number[]
) {
  const stack: number[] = [];
  let i = 0;
  for (let item of pushed) {
    stack.push(item);
    while (stack.length > 0 && stack[stack.length - 1] === popped[i]) {
      stack.pop();
      i++;
    }
  }
  return stack.length === 0;
}
