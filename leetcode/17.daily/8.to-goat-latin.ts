// leetcode 824

export default function toGoatLatin(sentence: string) {
  const arr = ["a", "e", "i", "o", "u"];
  return sentence
    .split(" ")
    .map((item, index) => {
      if (arr.includes(item.toLowerCase()[0])) {
        return item + "ma" + "a".repeat(index + 1);
      } else {
        return item.slice(1) + item[0] + "ma" + "a".repeat(index + 1);
      }
    })
    .join(" ");
}
