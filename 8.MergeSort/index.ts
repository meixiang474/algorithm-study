export {};
function mergeSort(arr: number[]) {
  function sortArr(arr: number[], l: number, r: number, temp: number[]) {
    if (l >= r) return;
    let mid = Math.floor(l + (r - l) / 2);
    sortArr(arr, l, mid, temp);
    sortArr(arr, mid + 1, r, temp);
    if (arr[mid] > arr[mid + 1]) {
      merge(arr, l, mid, r, temp);
    }
  }
  function merge(
    arr: number[],
    l: number,
    mid: number,
    r: number,
    temp: number[]
  ) {
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
      } else if (temp[i] <= temp[j]) {
        arr[k] = temp[i];
        i++;
      } else {
        arr[k] = temp[j];
        j++;
      }
    }
  }
  const temp = [...arr];
  sortArr(arr, 0, arr.length - 1, temp);
  return arr;
}
