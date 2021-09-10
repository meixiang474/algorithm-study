export {};
// 二路快排
function quickSort(arr: number[]) {
  function sortArr(arr: number[], l: number, r: number) {
    if (l >= r) return;
    let p = partition(arr, l, r);
    sortArr(arr, l, p - 1);
    sortArr(arr, p + 1, r);
  }
  function getRandom(l: number, r: number) {
    return Math.floor(Math.random() * (r - l + 1) + l);
  }
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  function partition(arr: number[], l: number, r: number) {
    let p = getRandom(l, r);
    swap(arr, l, p);
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
    swap(arr, l, j);
    return j;
  }
  sortArr(arr, 0, arr.length - 1);
  return arr;
}
// 三路快排
function quickSort1(arr: number[]) {
  function sortArr(arr: number[], l: number, r: number) {
    if (l >= r) return;
    let { left, right } = partition(arr, l, r);
    sortArr(arr, l, left);
    sortArr(arr, right, r);
  }
  function getRandom(l: number, r: number) {
    return Math.floor(Math.random() * (r - l + 1) + l);
  }
  function swap(arr: number[], i: number, j: number) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  function partition(arr: number[], l: number, r: number) {
    let p = getRandom(l, r);
    swap(arr, l, p);
    let left = l,
      i = l + 1,
      right = r + 1;
    while (i < right) {
      if (arr[i] < arr[l]) {
        left++;
        swap(arr, left, i);
        i++;
      } else if (arr[i] > arr[l]) {
        right--;
        swap(arr, right, i);
      } else {
        i++;
      }
    }
    swap(arr, l, left);
    return {
      left: left - 1,
      right,
    };
  }
  sortArr(arr, 0, arr.length - 1);
  return arr;
}

export function sortColors(colors: number[]) {
  let l = -1,
    i = 0,
    r = colors.length;
  const swap = (arr: number[], i: number, j: number) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  while (i < r) {
    if (colors[i] === 0) {
      l++;
      swap(colors, i, l);
      i++;
    } else if (colors[i] === 2) {
      r--;
      swap(colors, i, r);
    } else {
      i++;
    }
  }
  return colors;
}
