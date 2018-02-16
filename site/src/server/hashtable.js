const LinkedList = require('./linkedlist.js');

module.export = function HashTable() {
  let table = [];
  let length = 0;

  let hash = function(key) {
    let hash = 0;
    for(let i = 0; i < key.length; i++) {
      hash += key.charAt(i);
    }
    hash = hash % 31;

    return hash;
  };

  function ValuePair(key, value) {
    this.key = key;
    this.value = value;
  }

  this.put = function(key, value) {
    let hash = hash(key);
    let valuePair = new ValuePair(key, value);

    if(table[hash] === undefined) {
      let linkedList = new LinkedList();

      linkedList.addLast(valuePair);
      table[hash].push(linkedList);
    } else {
      table[hash].addLast(valuePair);
    }
    length++;
  };
};