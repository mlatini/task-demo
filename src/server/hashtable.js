module.exports = function HashTable() {
  const LinkedList = require('./linkedlist');

  let table = [], 
  length = 0,
  linkedList = new LinkedList();

  let hash = function(key) {
    let hash = '';

    for(let i = 0, max = key.length; i < max; i += 1) {
      hash += key.charCodeAt(i);
    }
    return hash % 31;
  };

  let ValuePair = function(key, value) {
    this.key = key;
    this.value = value;
  };

  this.put = function(key, value) {
    const hashedKey = hash(key),
    valuePair = new ValuePair(key, value);

    if(table[hashedKey] === undefined) {
      let linkedList = new LinkedList(); 
        linkedList.addLast(valuePair);
        table[hashedKey] = linkedList;
    } else {
      table[hashedKey].addLast(valuePair);
    }
    length += 1;
    return true;
  };

  this.get = function(key) {
    const hashedKey = hash(key);

    if(table[hashedKey] !== undefined) {
      let current = table[hashedKey].getHead();
      while(current) {
        if(current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
      return undefined;
    }
  };

  this.size = function() {
    return length;
  };
};