export {};
let mySet = new Set<any>();
mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add('some text');
let obj = { a: 1, b: 2 };
mySet.add(obj);
console.log(mySet);

const has = mySet.has(1);
console.log(has);
mySet.delete(5);
console.log(mySet);
console.log(mySet.size);

for (const item of mySet) {
  console.log(item);
}

for (const [key, value] of mySet.entries()) {
  console.log(key, value);
}

const myArr = [...mySet];
const myArr1 = Array.from(mySet);

const mySet1 = new Set<any>([1, 2, 3, 4]);

// 交集
const intersection = new Set([...mySet].filter((item) => mySet1.has(item)));

// 差集
const differece = new Set([...mySet].filter((item) => !mySet1.has(item)));
