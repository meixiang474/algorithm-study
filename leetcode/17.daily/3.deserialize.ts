// leetcode 385

export class NestedInteger {
  val: number | undefined;
  list: NestedInteger[];
  constructor(val?: number) {
    this.val = val;
    this.list = [];
  }
  add(item: NestedInteger) {
    this.list.push(item);
  }
}

export default function deserialize(s: string) {
  let index = 0;
  const dfs = (s: string): NestedInteger => {
    if (s[index] === "[") {
      const res = new NestedInteger();
      index++;
      while (s[index] !== "]") {
        res.add(dfs(s));
        if (s[index] === ",") {
          index++;
        }
      }
      index++
      return res;
    } else {
      let num = 0;
      let negative = false;
      if (s[index] === "-") {
        index++
        negative = true;
      }
      while (index < s.length && !isNaN(parseInt(s[index]))) {
        num = num * 10 + parseInt(s[index]);
        index++;
      }
      if (negative) {
        num *= -1;
      }
      return new NestedInteger(num);
    }
  };
  return dfs(s);
}
