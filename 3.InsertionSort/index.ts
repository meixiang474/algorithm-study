export {};
function insertionSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    let swapIndex = i;
    let current = arr[i];
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > current) {
        arr[j + 1] = arr[j];
        swapIndex = j;
      } else {
        break;
      }
    }
    if (swapIndex !== i) {
      arr[swapIndex] = current;
    }
  }
  return arr;
}
