// leetcode 208

export class TrieNode {
  isWord: boolean;
  map: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.map = new Map();
  }
}

export class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  insert(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.map.has(item)) current.map.set(item, new TrieNode());
      current = current.map.get(item)!;
    }
    current.isWord = true;
  }
  search(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.map.has(item)) return false;
      current = current.map.get(item)!;
    }
    return current.isWord;
  }
  startsWith(prefix: string) {
    let current = this.root;
    for (let item of prefix) {
      if (!current.map.has(item)) return false;
      current = current.map.get(item)!;
    }
    return true;
  }
}
