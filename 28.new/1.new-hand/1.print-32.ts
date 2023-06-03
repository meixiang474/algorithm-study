export default function print(num: number) {
  let res = "";
  for (let i = 31; i >= 0; i--) {
    res += num & (1 << i);
  }
  return res;
}

// todo 2