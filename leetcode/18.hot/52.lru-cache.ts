// leetcode 146

export class DLinkedListNode {
  key: number;
  value: number;
  next: DLinkedListNode | null;
  prev: DLinkedListNode | null;
  constructor(key: number, value: number) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

export default class LRUCache {
  capacity: number;
  size: number;
  head: DLinkedListNode;
  tail: DLinkedListNode;
  cache: Map<number, DLinkedListNode>
  constructor(capacity: number) {
    this.capacity = capacity
    this.size = 0
    this.head = new DLinkedListNode(-1, -1)
    this.tail = new DLinkedListNode(-1, -1)
    this.head.next = this.tail
    this.tail.prev = this.head
    this.cache = new Map()
  }
  get(key: number) {
    const cacheNode = this.cache.get(key)
    if(!cacheNode) return -1
    this.moveToHead(cacheNode)
    return cacheNode.value
  }
  put(key: number, value: number) {
    const cacheNode = this.cache.get(key)
    if(!cacheNode) {
      const newNode = new DLinkedListNode(key, value)
      this.cache.set(key, newNode)
      this.addToHead(newNode)
      this.size++
      if(this.size > this.capacity) {
        const tail = this.tail.prev!
        this.removeNode(tail)
        this.cache.delete(tail.key)
        this.size--
      }
    }else {
      this.moveToHead(cacheNode)
      cacheNode.value = value
    }
  }
  addToHead(node: DLinkedListNode) {
    node.prev = this.head
    node.next = this.head.next
    this.head.next = node
    node.next!.prev = node
  }
  removeNode(node: DLinkedListNode) {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }
  moveToHead(node: DLinkedListNode) {
    this.removeNode(node)
    this.addToHead(node)
  }
}