const expect = require('chai').expect,
LinkedList = require('../src/server/linkedlist');


describe('LinkedList', function() {
  describe('#addFirst()', function() {
    it('should add new node to head if linkedList is empty', function() {
      let linkedList = new LinkedList(), 
      head = null;

      linkedList.addFirst('Tester');
      head = linkedList.getHead();
      expect(head.element).to.equal('Tester');
    });
    it('should make new node head if head exists', function() {
      let linkedList = new LinkedList(), 
      head = null;

      linkedList.addFirst('Head');
      linkedList.addFirst('New Head');
      head = linkedList.getHead();
      expect(head.element).to.equal('New Head');
    });
    it('should increment size by 1 when adding item to existing list', function() {
      let linkedList = new LinkedList(),
      linkedListSize = 0;

      linkedList.addFirst('One');
      linkedListSize = linkedList.size();
      linkedList.addFirst('Two');
      expect(linkedList.size()).to.equal(linkedListSize + 1);
    });
  });
  describe('#addLast', function() {
    it('should add a node to head if linkedlist is empty', function() {
      let linkedList = new LinkedList(), 
      head = null;

      linkedList.addLast('Tester');
      head = linkedList.getHead();
      expect(head.element).to.equal('Tester');
    });
    it('should add a node after head if only head exists', function() {
      let linkedList = new LinkedList(), 
      head = null;

      linkedList.addLast('Head');
      linkedList.addLast('Second');
      head = linkedList.getHead();
      expect(head.next.element).to.equal('Second');
    });
    it('should return size of 1 when adding item to empty list', function() {
      let linkedList = new LinkedList();

      linkedList.addLast('Tester');
      expect(linkedList.size()).to.equal(1);
    });
    it('should increment size by 1 when adding item to existing list', function() {
      let linkedList = new LinkedList(),
      linkedListSize = 0;

      linkedList.addLast('One');
      linkedListSize = linkedList.size();
      linkedList.addLast('Two');
      expect(linkedList.size()).to.equal(linkedListSize + 1);
    });
  });
  describe('#addBefore()', function() {
    it('should insert before existing element', function() {
      let linkedList = new LinkedList(),
      current = null;

      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');

      linkedList.addBefore('Inserted Before', 'Second Element'); 
      current = linkedList.getHead(); // 'First Element'
      current = current.next; // Should be inserted in this position.'
      expect(current.element).to.equal('Inserted Before');
    });
    it('should return true when inserting before existing element', function() {
      let linkedList = new LinkedList(),
      inserted = true;

      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');

      inserted = linkedList.addBefore('Inserted Before', 'Second Element'); 
      expect(inserted).to.be.true;
    });
    it('should return false if element to insert before does not exist', function() {
      let linkedList = new LinkedList(),
      inserted = false;

      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');

      inserted = linkedList.addBefore('Inserted Before', 'Bogus Element'); 
      expect(inserted).to.be.false;
    });
    it('should increment size by 1 when adding item to existing list', function() {
      let linkedList = new LinkedList(),
      linkedListSize = 0;
      
      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');
      linkedListSize = linkedList.size();

      linkedList.addBefore('Inserted Before', 'Second Element'); 
      expect(linkedList.size()).to.equal(linkedListSize +1);
    });
  });
  describe('#addAfter()', function() {
    it('should insert after existing element', function() {
      let linkedList = new LinkedList(),
      current = null;

      linkedList.addLast('First Element');
      linkedList.addLast('Second Element');
      linkedList.addLast('Third Element');

      linkedList.addAfter('Inserted After', 'Second Element');
      current = linkedList.getHead(); // 'First Element'
      current = current.next; // 'Second Element;
      current = current.next; // Shoud have been added here. 
      expect(current.element).to.equal('Inserted After');
    });
    it('should return true when inserting after existing element', function() {
      let linkedList = new LinkedList(), 
      inserted = true;

      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');

      inserted = linkedList.addAfter('Inserted After', 'Second Element');
      expect(inserted).to.be.true;
    });
    it('should return false if element to insert after doesnt exist', function () {
      let linkedList = new LinkedList(),
      inserted = false;

      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');

      inserted = linkedList.addAfter('Second Element', 'Bogus Element');
      expect(inserted).to.be.false;
    });
    it('should increment size by 1 when adding item to existing list', function() {
      let linkedList = new LinkedList(),
      linkedListSize = 0;
      
      linkedList.addFirst('First Element');
      linkedList.addFirst('Second Element');
      linkedList.addFirst('Third Element');
      linkedListSize = linkedList.size();

      linkedList.addAfter('Inserted Before', 'Second Element'); 
      expect(linkedList.size()).to.equal(linkedListSize +1);
    });
  });
  describe('#find()', function() {
    it('should find existing element in the list', function() {
      let linkedList = new LinkedList(), 
      foundElement = null;

      linkedList.addLast('First Element');
      linkedList.addLast('Second Element');
      linkedList.addLast('Third Element');

      foundElement = linkedList.find('Second Element');
      expect(foundElement).to.equal('Second Element');
    });
    it('should return null if the item is not in the list', function() {
      let linkedList = new LinkedList(), 
      foundElement;
      
      linkedList.addLast('There');
      foundElement = linkedList.find('Not There');
      expect(foundElement).to.be.a('null');
    });
    it('should return null if searching an empty list', function() {
      let linkedList = new LinkedList, 
      foundElement;

      foundElement = linkedList.find('Not In Empty List');
      expect(foundElement).to.be.a('null');
    });
  });
  describe('#toString()', function() {
    it('should return a comma seperated string equal to the items added', 
      function() {
        let linkedList = new LinkedList(), 
        returnString = null, 
        expectedString = '';

        linkedList.addLast('First Element');
        linkedList.addLast('Second Element');

        returnString = linkedList.toString();
        expectedString = 'First Element,Second Element';

        expect(returnString).to.equal(expectedString);
    });
  });
});