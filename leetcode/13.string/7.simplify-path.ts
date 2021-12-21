// leetcode 71

export default function simplifyPath(path: string) {
  const stack: string[] = [];
  const dirs = path.split("/");
  for (let item of dirs) {
    if (item === "." || item === "") continue;
    if (item === "..") {
      stack.pop();
      continue;
    }
    stack.push(item);
  }
  return "/" + stack.join("/");
}
