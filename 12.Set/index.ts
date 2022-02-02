import { BST } from "../11.BST";
// 去重
const arr = [1, 1, 2, 2];
const arr2 = [...new Set(arr)];
console.log(arr2);

// 判断元素是否在集合中
const set = new Set(arr);
const has = set.has(1);

// 求交集
const set2 = new Set([2, 3]);
const set3 = new Set([...set].filter((item) => set2.has(item)));

export default class BSTSet<T = number> {
  bst: BST<T>;
  constructor() {
    this.bst = new BST<T>();
  }
  getSize() {
    return this.bst.getSize();
  }
  isEmpty() {
    return this.bst.isEmpty();
  }
  add(e: T) {
    this.bst.add(e);
  }
  contains(e: T) {
    return this.bst.contains(e);
  }
  remove(e: T) {
    this.bst.remove(e);
  }
}
