export default function shellSort(nums: number[]) {
  const res = [...nums];
  // 进行插入排序的子数组的个数
  let h = Math.floor(res.length / 2);
  while (h) {
    // 遍历所有子数组进行插入排序
    for (let start = 0; start < h; start++) {
      for (let i = start; i < res.length; i += h) {
        const current = res[i];
        let swapIndex = i;
        for (let j = i - h; j >= start; j -= h) {
          if (res[j] > current) {
            res[j + h] = res[j];
            swapIndex = j;
          } else {
            break;
          }
        }
        if (swapIndex !== i) {
          res[swapIndex] = current;
        }
      }
    }
    h = Math.floor(h / 2);
  }
  return res;
}
