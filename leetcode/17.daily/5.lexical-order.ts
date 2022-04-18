// leetcode 386

export default function lexicalOrder(n: number) {
  const res: number[] = [];
  let number = 1;
  for (let i = 0; i < n; i++) {
    res.push(number);
    if (number * 10 <= n) {
      number *= 10;
    } else {
      while (number % 10 === 9 || number === n) {
        number = Math.floor(number / 10);
      }
      number++;
    }
  }
  return res;
}
