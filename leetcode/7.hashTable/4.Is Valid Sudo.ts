// leetcode 36

export default function isValidSudoku(board: string[][]): boolean {
  if (board.length === 0 || board[0].length === 0) return false;
  const m = board.length;
  const n = board[0].length;
  const rows: number[][] = new Array(m).fill(0).map(() => new Array(9).fill(0));
  const cols: number[][] = new Array(n).fill(0).map(() => new Array(9).fill(0));
  const subs: number[][][] = new Array(3)
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      const current = board[r][c];
      if (current !== ".") {
        const index = parseInt(current) - 1;
        rows[r][index]++;
        cols[c][index]++;
        subs[Math.floor(r / 3)][Math.floor(c / 3)][index]++;
        if (
          rows[r][index] > 1 ||
          cols[c][index] > 1 ||
          subs[Math.floor(r / 3)][Math.floor(c / 3)][index] > 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
