const HashTable = require('../src//server/hashtable'),
expect = require('chai').expect;

let hashTable = new HashTable();

describe('HashTable()', function() {
  describe('#put', function() {
    it('should return true when new item is added', function() {
      let hashTable = new HashTable();
      expect(hashTable.put('New Person', 'person@email.com')).to.equal(true);
    });
    it('should have size of 1 after an item is added', function() {
      let hashTable = new HashTable();
      hashTable.put('New Person', 'person@email.com');
      expect(hashTable.size()).to.equal(1);
    });
    it('should be able to find and return the added value after it is added', 
      function() {
        let hashTable = new HashTable(), 
        key = 'New Person',
        value = 'person@email.com';

        hashTable.put(key, value);
        expect(hashTable.get(key)).to.be.a('string');
    });
  });
  describe('#get', function() {
    it('should return a known item that has been added.', function() {
      let hashTable = new HashTable(), 
      key = 'New Person',
      value = 'person@email.com';

      hashTable.put(key, value);
      expect(hashTable.get(key)).to.be.a('string');
    });
    it('should return undefined if searching for a nonexistant item', 
      function() {
        let hashTable = new HashTable();

        hashTable.put('New Person 1', 'newperson1@email.com');
        hashTable.put('New Person 2', 'newpwerson2@email.com');

        expect(hashTable.get('Bogus Person')).to.be.an('undefined');
    });
  });
});