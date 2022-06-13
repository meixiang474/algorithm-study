// leetcode 1051

export default function heightChecker(heights: number[]) {
  let res = 0;
  [...heights]
    .sort((a, b) => a - b)
    .forEach((item, index) => {
      if (item !== heights[index]) res++;
    });
  return res;
}
