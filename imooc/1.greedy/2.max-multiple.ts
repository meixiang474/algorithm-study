// https://www.luogu.com.cn/problem/P1249

//12 -> 3 4 5

export default function maxMultiple(n: number) {
  const res = [0, 0, 1, 2, 3];
  if (n <= 4) return res[n];
  let arr = [2];
  n -= 2;
  while (n >= arr[arr.length - 1] + 1) {
    n -= arr[arr.length - 1] + 1;
    arr.push(arr[arr.length - 1] + 1);
  }
  let index = arr.length - 1;
  for (let i = 0; i < n; i++) {
    arr[index]++;
    index--;
    if (index < 0) {
      index = arr.length - 1;
    }
  }
  return arr.reduce((a, b) => a * b);
}
