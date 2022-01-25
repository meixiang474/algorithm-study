// leetcode 130

export default function solve(board: string[][]) {
  if (board.length === 0 || board[0].length === 0) return board;
  const m = board.length;
  const n = board[0].length;
  const dfs = (r: number, c: number) => {
    board[r][c] = "A";
    [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ].forEach(([nextR, nextC]) => {
      if (
        nextR >= 0 &&
        nextR < m &&
        nextC >= 0 &&
        nextC < n &&
        board[nextR][nextC] === "O"
      ) {
        dfs(nextR, nextC);
      }
    });
  };
  for (let r = 0; r < m; r++) {
    if (board[r][0] === "O") {
      dfs(r, 0);
    }
    if (board[r][n - 1] === "O") {
      dfs(r, n - 1);
    }
  }
  for (let c = 0; c < n; c++) {
    if (board[0][c] === "O") {
      dfs(0, c);
    }
    if (board[m - 1][c] === "O") {
      dfs(m - 1, c);
    }
  }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "A") {
        board[r][c] = "O";
      } else {
        board[r][c] = "X";
      }
    }
  }
}
