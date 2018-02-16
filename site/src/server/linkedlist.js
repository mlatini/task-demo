module.exports = function LinkedList() {
  let length = 0;
  let head = null;
  
  function Node(element) {
    this.element = element;
    this.next = null;
  }

  this.addFirst = function(element) {
    let current = head;
    let node = new Node(element);

    if(!current) { // no head so new Node = head
      head = node;
    } else { // has head so add new Node before head
      node.next = current;
      head = node;
    }
    length++;
  };

  this.addLast = function() {
    let current = head;
    let node = new Node(element);

    if(!current) { // no head so new Node = head
      head = node;
    } else { // has head so step through to last and add
      while(current.next) {
        current = current.next;
      }
      current.next = node; 
    }
    length++;
  };

  this.getHead = function() {
    return head;
  };
};