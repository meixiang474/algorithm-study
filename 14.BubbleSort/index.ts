export {};
function bubbleSort(data: number[]): number[] {
  function swap(arr: any[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  for (let i = 0; i < data.length - 1; i++) {
    let flag = false;
    for (let j = 0; j < data.length - i - 1; j++) {
      if (data[j] > data[j + 1]) {
        swap(data, j, j + 1);
        flag = true;
      }
    }
    if (!flag) break;
  }
  return data;
}
