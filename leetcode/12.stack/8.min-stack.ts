// leetcode 155

export default class MinStack {
  items: number[]
  queue: number[]
  constructor() {
    this.items = []
    this.queue = []
  }
  push(item: number) {
    this.items.push(item)
    if(this.queue.length === 0 || this.queue[0] >= item) {
      this.queue.unshift(item)
    }
  }
  pop() {
    const res = this.items.pop()
    if(res === this.queue[0]) {
      this.queue.shift()
    }
  }
  top() {
    return this.items[this.items.length - 1]
  }
  getMin() {
    return this.queue[0]
  }
}