export default function exists(board: string[][], word: string) {
  const m = board.length;
  const n = board[0]?.length || 0;
  const dfs = (r: number, c: number, index: number): boolean => {
    if (index === word.length - 1) return true;
    const temp = board[r][c];
    board[r][c] = "";
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
        board[nextR][nextC] === word[index + 1]
      ) {
        return dfs(nextR, nextC, index + 1);
      }
    });
    if (res) {
      return true;
    }
    board[r][c] = temp;
    return false;
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
