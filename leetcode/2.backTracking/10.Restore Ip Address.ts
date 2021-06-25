/**
 * @description leetcode 93
 */

export default function restoreIpAddresses(s: string): string[] {
  let ips: string[] = [];
  const res: string[] = [];
  const backtrack = (ipIndex: number, index: number) => {
    if (ipIndex === 4) {
      if (index === s.length) {
        res.push(ips.join("."));
      }
      return;
    }
    if (index === s.length) return;
    if (s[index] === "0") {
      ips[ipIndex] = "0";
      backtrack(ipIndex + 1, index + 1);
    }
    let item = 0;
    for (let i = index; i < s.length; i++) {
      item = item * 10 + parseInt(s[i]);
      if (item > 0 && item <= 255) {
        ips[ipIndex] = item.toString();
        backtrack(ipIndex + 1, i + 1);
      } else {
        break;
      }
    }
  };
  backtrack(0, 0);
  return res;
}
