module.exports = function Task() {
    // Own properties.
    this.id = '';
    this.dueDate = '';
    this.createdDate = ''; 
    this.completedDate = '';
    this.deletedDate = '';
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
    //    An integer that determines the number of periods of the cadence 
    //      below. IE: time of 5 and cadence of 'days' would be every 5 days.
    //   cadence : String
    ///   valid options are:
    //    'Minute'
    //    'Hour'
    //    'Day'
    //    'Week'
    //    'Month'
    //    'Year'
    // }

    // These properties are UUID's of other objects. 
    this._category = '';
    this._owner = '';
    this._createdBy = '';
    this._previousTask = '';
  };