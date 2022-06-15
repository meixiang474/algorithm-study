// https://www.luogu.com.cn/problem/P1095

// is not right

export default function islandEscape(m: number, s: number, t: number) {
  let dis = 0;
  for (let i = 1; i <= t; i++) {
    if (m >= 10) {
      dis += 60;
      m -= 10;
    } else if (
      (m < 2 && (t - i < 3 || s - dis <= 85)) ||
      (m < 6 && (t - i < 2 || s - dis <= 34)) ||
      t - i == 0 ||
      s - dis <= 17
    )
      dis += 17;
    else {
      m += 4;
    }
    if (dis >= s) {
      return true;
    }
  }
  if (dis < s) {
    return dis;
  }
}

console.log(islandEscape(0, 1000, 11))


