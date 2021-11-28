// leetcode 933

export default class RecentCounter {
  queue: number[];
  constructor() {
    this.queue = [];
  }

  ping(t: number): number {
    this.queue.push(t);
    while (this.queue.length > 1) {
      const first = this.queue[0];
      if (t - first > 3000) {
        this.queue.shift();
      } else {
        break;
      }
    }
    return this.queue.length;
  }
}
