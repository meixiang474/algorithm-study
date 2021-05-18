export default function printNumbers(n: number) {
  const end = 10 ** n - 1;
  const res: number[] = [];
  for (let i = 1; i <= end; i++) {
    res.push(i);
  }
  return res;
}
