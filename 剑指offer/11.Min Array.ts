export default function minArray(numbers: number[]) {
  let l = 0,
    r = numbers.length - 1;
  while (l < r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (numbers[mid] < numbers[r]) {
      r = mid;
    } else if (numbers[mid] > numbers[r]) {
      l = mid + 1;
    } else {
      r--;
    }
  }
  return numbers[l];
}
