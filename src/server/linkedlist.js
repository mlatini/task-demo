module.exports = function LinkedList() {
  let length = 0, 
  head = null, 
  Node = function(element) {
    this.element = element;
    this.next = null;
  };

  this.addFirst = function(element) {
    let node = new Node(element);

    if(!head) {
      head = node;
      length += 1;
    } else {
      node.next = head;
      head = node;
      length += 1;
    }
  };

  this.addLast = function(element) {
    let current = head, 
    node = new Node(element);

    // if head is null, new node becomes head. 
    if(!head) {
      head = node;
      length += 1;
    } else {
      while(current.next) {
        current = current.next;
      }
      current.next = node;
      length += length;
    }
  };

  this.addBefore = function(newElement, existingElement) {
    let current = head, 
    previous = null,
    node = new Node(newElement);

    if(head.element === existingElement) { // Head is element ot insert
      node.next = head;
      head = node;
      length += 1;
      return true;
    } else { // Element to add before is other than head. 
      while(current) {
        if(current.element === existingElement) { // Match, add before here.
          previous.next = node;
          node.next = current;
          length += 1;
          return true;
        }
        previous = current;
        current = current.next;
      }
      return false; // Element to add before doesn't exist. 
    }
  };

  this.addAfter = function(newElement, existingElement) {
    let node = new Node(newElement),
    current = head;

    while(current) {
      if(current.element === existingElement) { // adding here
        node.next = current.next;
        current.next = node;
        length += 1;
        return true;
      }
      current = current.next; 
    }
    return false; // the exstingElement doesn't exist.
  };

  this.find = function(element) {
    let current = head;

    if(length === 0) { // empty list
      return null;
    } else {
      while(current) {
        if(current.element === element) { // element found
          return current.element;
        }
        current = current.next;
      }
    }
    return null; // element not found;
  };

  this.toString = function() {
    let returnString = '', 
    current = head;

    while(current) {
      if(current.next) { // not last node
        returnString += current.element + ',';
      } else {
        returnString += current.element;
      }
      current = current.next;
    }
    return returnString;
  };

  this.getHead = function() {
    return head;
  };

  this.size = function() {
    return length;
  };

};