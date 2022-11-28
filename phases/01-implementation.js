class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null)
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    if(this.count / this.capacity > 0.7) this.resize()
    let ind = this.hashMod(key)
    let curr = this.data[ind]
    if(!curr){
      this.data[ind] = new KeyValuePair(key,value)
      this.count++
      return;
    }
    while(curr){
      if(curr.key===key){
        curr.value = value;
        return
      }
      curr = curr.next;
    }
    curr = this.data[ind]
    this.data[ind] = new KeyValuePair(key,value)
    this.data[ind].next = curr
    this.count++
    return;

    // count divided by the capacity
  }


  read(key) {
    // Your code here
    let hashKey = this.hashMod(key)
    if(!this.data[hashKey]) return undefined;

    let curr = this.data[hashKey];
    while(curr){
      if(curr.key === key) return curr.value;
      curr = curr.next
    }
    return undefined;
  }
  // [null,null,list->node1->node2->-3>,null,list->,null]

  resize() {
    // Your code here
    let oldData = this.data
    this.capacity = this.capacity*2
    this.data = new Array(this.capacity).fill(null)
    this.count = 0;
    for (let i = 0; i < oldData.length; i++){
      if(!oldData[i]) continue;
      let curr = oldData[i]
      while(curr){
        this.insert(curr.key,curr.value)
        curr = curr.next
      }
    }
  }


  delete(key) {
    // Your code here
    let hashKey = this.hashMod(key)
    if(!this.data[hashKey]) return "Key not found"

    let curr = this.data[hashKey];
    let prev = null;
    while(curr){

      if(curr.key === key){
        if(!prev){
          this.data[hashKey] = curr.next
          this.count--;
          return
        }else{
          prev.next = curr.next;
          this.count--;
          return
        }
      }
      prev = curr;
      curr = curr.next;
    }
    return "Key not found"
  }
}

// let hashTable = new HashTable(2)
// hashTable.insert("key1", "value1");
// console.log(hashTable.read("key1"))
// hashTable.insert("key2", "value2");
// hashTable.insert("key3", "value3");
// console.log(hashTable.capacity)
// hashTable.resize();
// console.log(hashTable.capacity)
// console.log(hashTable.read("key1"))
// console.log(hashTable.read("key2"))
// console.log(hashTable.read("key3"))
// console.log(hashTable)

module.exports = HashTable;
