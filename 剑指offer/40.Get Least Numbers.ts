/**
 * @description 剑指offer 40
 */

export default function getLeastNumbers(arr: number[], k: number): number[] {
  if (k >= arr.length) return arr;
  const sortArr = (arr: number[], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(0, k);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(0, k);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number): number => {
    return Math.floor(Math.random() * (r - l + 1) + l);
  };
  const swap = (arr: number[], i: number, j: number): void => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  const partition = (arr: number[], l: number, r: number): number => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i] < arr[l]) {
        i++;
      }
      while (j >= i && arr[j] > arr[l]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, j, l);
    return j;
  };
  return sortArr([...arr], 0, arr.length - 1);
}
