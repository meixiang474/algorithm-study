// https://www.luogu.com.cn/problem/P1095

export default function islandEscape(m: number, s: number, t: number) {}

const m = 1;
const t = 0;
const i = 3;
const dis = 4;
const s = 10;
const a =
  (m < 2 && (t - i < 3 || s - dis <= 85)) ||
  (m < 6 && (t - i < 2 || s - dis <= 34)) ||
  t - i == 0 ||
  s - dis <= 17;
