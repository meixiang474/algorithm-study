/**
 * @description leetcode 79
 */

export default function exist(board: string[][], word: string): boolean {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const map: boolean[][] = Array.from({ length: m }, () =>
    new Array(n).fill(false)
  );
  const dfs = (r: number, c: number, index: number) => {
    if (index >= word.length - 1) return true;
    map[r][c] = true;
    const res = [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].some(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        !map[nextR][nextC] &&
        board[nextR][nextC] === word[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
      return false;
    });
    map[r][c] = false;
    return res;
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === word[0]) {
        const res = dfs(r, c, 0);
        if (res) {
          return true;
        }
      }
    }
  }
  return false;
}
