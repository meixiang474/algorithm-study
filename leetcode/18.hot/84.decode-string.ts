// leetcode 394

export default function decodeString(s: string) {
  let index = 0;

  const getString = (): string => {
    if (index === s.length || s[index] === ']') return "";
    const current = s[index];
    let res = "";
    if (!isNaN(parseFloat(current))) {
      const repeat = getRepeat();
      index++;
      const str = getString();
      index++;
      res += str.repeat(repeat);
    } else {
      res = current;
      index++;
    }
    return res + getString();
  };

  const getRepeat = () => {
    let repeat = 0;
    while (index < s.length && s[index] !== "[") {
      repeat = repeat * 10 + parseFloat(s[index]);
      index++;
    }
    return repeat;
  };
  return getString();
}
