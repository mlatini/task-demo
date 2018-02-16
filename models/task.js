module.exports = function Task() {
    // Own properties.
    this.id = '';
    this.dueDate = '';
    this.createdDate = ''; 
    this.completedDate = '';
    this.deleteddate = '';
    this.title = ''; 
    this.description = '';
    this.status = ''; 
    // status = {
    //  completed : Boolean,
    //  paused : Boolean,
    //  inProgress : Boolean,
    //  notStarted : Boolean, 
    //  deleted : Boolean
    // }
    this.frequency = '';
    // frequency : {
    //   time : Number,
    //   cadence : String
    // }

    // These properties are UUID's of other objects. 
    this._category = '';
    this._owner = '';
    this._createdBy = '';
    this._previousTask = '';
  };