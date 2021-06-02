/**
 * @description 剑指offer 51
 */

export default function reversePairs(nums: number[]) {
  let res = 0;
  const sortArr = (arr: number[], l: number, r: number, temp: number[]) => {
    if (l >= r) return;
    const mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  };
  const merge = (
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) => {
    for (let i = l; i <= r; i++) {
      temp[i] = arr[i];
    }
    let i = l,
      j = mid + 1;
    for (let k = l; k <= r; k++) {
      if (i > mid) {
        arr[k] = temp[j];
        j++;
      } else if (j > r) {
        arr[k] = temp[i];
        i++;
      } else if (temp[i] > temp[j]) {
        res += mid - i + 1;
        arr[k] = temp[j];
        j++;
      } else {
        arr[k] = temp[i];
        i++;
      }
    }
  };
  sortArr(nums, 0, nums.length - 1, [...nums]);
  return res;
}
