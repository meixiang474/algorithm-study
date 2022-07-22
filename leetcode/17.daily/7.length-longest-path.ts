// leetcode 388

export default function lengthLongestPath(input: string) {
  let res = 0;
  let index = 0;
  const stack: number[] = [];
  while (index < input.length) {
    let depth = 1;
    while (index < input.length && input[index] === "\t") {
      index++;
      depth++;
    }
    let len = 0;
    let isFile = false;
    while (index < input.length && input[index] !== "\n") {
      if (input[index] === ".") isFile = true;
      len++;
      index++;
    }
    index++;
    if (stack[depth - 2] != null) {
      len += stack[depth - 2] + 1;
    }
    if (isFile) {
      res = Math.max(res, len);
    } else {
      stack[depth - 1] = len;
    }
  }
  return res;
}
