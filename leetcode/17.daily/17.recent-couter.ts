// leetcode 933

export default class RecentCounter {
  list: number[];
  constructor() {
    this.list = [];
  }

  ping(t: number): number {
    const min = t - 3000;
    this.list.push(t);
    while (this.list.length > 0) {
      if (this.list[0] < min) {
        this.list.shift();
      } else {
        break;
      }
    }
    return this.list.length;
  }
}
