// leetcode 347

export default function topKFrequent(nums: number[], k: number) {
  const map = new Map<number, number>();
  for (let item of nums) {
    map.set(item, map.has(item) ? map.get(item)! + 1 : 1);
  }
  const arr: number[][] = [];
  for (let [key, value] of map) {
    arr.push([key, value]);
  }
  if (k >= arr.length) return arr.map((item) => item[0]);
  k = arr.length - k;
  const sortArr = (arr: number[][], l: number, r: number): number[] => {
    if (l >= r) return arr.slice(k).map((item) => item[0]);
    const p = partition(arr, l, r);
    if (p === k) {
      return arr.slice(k).map((item) => item[0]);
    } else if (p > k) {
      return sortArr(arr, l, p - 1);
    } else {
      return sortArr(arr, p + 1, r);
    }
  };
  const getRandom = (l: number, r: number) =>
    Math.floor(Math.random() * (r - l + 1) + l);
  const swap = (arr: number[][], i: number, j: number) =>
    ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const partition = (arr: number[][], l: number, r: number) => {
    const p = getRandom(l, r);
    swap(arr, p, l);
    let i = l + 1,
      j = r;
    while (true) {
      while (i <= j && arr[i][1] < arr[l][1]) {
        i++;
      }
      while (i <= j && arr[j][1] > arr[l][1]) {
        j--;
      }
      if (i >= j) break;
      swap(arr, i, j);
      i++;
      j--;
    }
    swap(arr, l, j);
    return j;
  };

  const res = sortArr(arr, 0, arr.length - 1);
  return res;
}
