// leetcode 211

class TrieNode {
  isWord: boolean;
  next: Map<string, TrieNode>;
  constructor(isWord: boolean = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

export class WordDictionary {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }
  addWord(word: string) {
    let current = this.root;
    for (let item of word) {
      if (!current.next.has(item)) {
        current.next.set(item, new TrieNode());
      }
      current = current.next.get(item)!;
    }
    current.isWord = true;
  }
  search(word: string) {
    return this.match(this.root, word, 0);
  }
  match(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      return node.isWord;
    }
    const current = word[index];
    if (current !== ".") {
      if (!node.next.has(current)) {
        return false;
      }
      return this.match(node.next.get(current)!, word, index + 1);
    } else {
      for (let [, item] of node.next) {
        const res = this.match(item, word, index + 1);
        if (res) return true;
      }
      return false;
    }
  }
}
