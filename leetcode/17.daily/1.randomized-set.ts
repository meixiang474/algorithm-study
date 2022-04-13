// leetcode 380

export default class RandomizedSet {
  nums: number[];
  map: Map<number, number>
  constructor() {
    this.nums = []
    this.map = new Map()
  }
  insert(val: number) {
    if(this.map.has(val)) {
      return false
    }
    this.nums.push(val)
    this.map.set(val, this.nums.length - 1)
    return true
  }
  remove(val: number) {
    if(!this.map.has(val)) {
      return false
    }
    const index = this.map.get(val)!
    this.nums[index] = this.nums[this.nums.length - 1]
    this.nums.pop()
    this.map.set(this.nums[index], index)
    this.map.delete(val)
    return true
  }
  getRandom() {
    const index = Math.floor(Math.random() * this.nums.length)
    return this.nums[index]
  }
}