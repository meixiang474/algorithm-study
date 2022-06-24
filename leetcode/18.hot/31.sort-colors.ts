// leetcode 75

export default function sortColors(colors: number[]) {
  let l = -1,
    r = colors.length;
  let i = 0;
  const swap = (i: number, j: number) =>
    ([colors[i], colors[j]] = [colors[j], colors[i]]);
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(i, l);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(i, r);
    } else {
      i++;
    }
  }
}
