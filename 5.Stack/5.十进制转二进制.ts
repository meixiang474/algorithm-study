function decToBi(num: number) {
  if(num === 0) return 0;
  const arr = [];
  while (num) {
    arr.unshift(num % 2);
    num = Math.floor(num / 2);
  }
  return parseFloat(arr.join(''));
}
