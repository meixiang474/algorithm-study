export default function harmmingWeight(n: number) {
  return n
    .toString(2)
    .split("")
    .reduce((memo, current) => {
      if (current === "1") memo++;
      return memo;
    }, 0);
}
