// leetcode 1037

export default function isBoomerang(points: number[][]): boolean {
  const x1 = points[0][0] - points[1][0];
  const y1 = points[0][1] - points[1][1];
  const x2 = points[0][0] - points[2][0];
  const y2 = points[0][1] - points[2][1];
  return x1 * y2 !== x2 * y1;
}
