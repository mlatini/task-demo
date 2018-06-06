var dataServices = require('./data-services.js');
var common = require('./common');
var moment = require('moment');

window.onload = function() {
  common.populateUsersDropdown();

  //highlight the page in the navbar
  document.getElementById('tasks-link').classList.toggle('active-page-link');
};

// When the user clicks one one of the filter checkboxes, save the changes
// to the database and refresh the page 
document.getElementById('show-completed-check').onclick = function() {
  var settings = {
    tasks : {
      showCompletedTasks : this.checked,
      showDeletedTasks : document.getElementById('show-deleted-check').checked,
      showOnlyMyTasks: document.getElementById('show-only-my-tasks-check').checked
    }
  };
  dataServices.updateSettings(settings, function(err, settings) {
    if(!err) {
      location.reload(true);
    }
  });
};
document.getElementById('show-deleted-check').onclick = function() {
  var settings = {
    tenantId : 1,
    tasks : {
      showDeletedTasks : this.checked,
      showCompletedTasks : document.getElementById('show-completed-check').checked,
      showOnlyMyTasks: document.getElementById('show-only-my-tasks-check').checked
    }
  };
  dataServices.updateSettings(settings, function(err) {
    if(!err) {
      location.reload(true);
    }
  });
};
document.getElementById('show-only-my-tasks-check').onclick = function() {
  var settings = {
    tasks: {
      showOnlyMyTasks: this.checked,
      showDeletedTasks: document.getElementById('show-deleted-check').checked,
      showCompletedTasks: document.getElementById('show-completed-check').checked
    }
  };
  dataServices.updateSettings(settings, function(err) {
    if(!err) {
      location.reload(true);
    }
  });
};

// When the user clicks on the status buttons, change
// the status in the db and refresh the page
document.addEventListener('click', function() {
  console.log('target', event.target.dataset.id);
  const id = event.target.dataset.id;

  let taskStatus = '', 
    task = '';

  if (event.target.matches('.start')) {
    taskStatus = { 'completed' : false, 'paused' : false, 
      'inProgress' : true, 'notStarted' : false };
    task = {'id' : id, status : taskStatus};
    dataServices.updateTaskStatus(task, function(err) {
      if(!err) {
        location.reload(true);
      } else {
        // TODO: notify user if there's and error and leave as is 
      }
    });
  } else if (event.target.matches('.pause')) {
    console.log('pause');
    taskStatus = { 'completed' : false, 'paused' : true, 
      'inProgress' : false, 'notStarted' : false };
    task = {'id' : id, status : taskStatus};
    dataServices.updateTaskStatus(task, function(err) {
      if(!err) {
        location.reload(true);
      } else {
        // TODO: notify user if there's and error and leave as is
      } 
    });
  } else if (event.target.matches('.complete')) {
    // update task to completed state and then update it in the db
    taskStatus = { 'completed' : true, 'paused' : false, 
      'inProgress' : false, 'notStarted' : false };
    task = {'completedDate' : new Date(), 'id' : id, status : taskStatus};
    dataServices.updateTaskStatus(task, function(err) {
      if(!err) {
        //addTaskToCompleted(id, function() { 
          makeNewTask(id, function(err, newTask) {
            if (err) {
              console.log(err.message + ' taskID: ' + id);
            }
            saveTask(newTask, function(err) {
              // Getting an err is normal if I'm passing in a null task,
              // which would be the case if this is a non-recurring task
              if (err) {
                console.log(err.message);
              }
              location.reload(true);
            });
          });
        //});
      } else {
        // TODO: notify user if there's an error and leave as is
      }
    });
  } else if (event.target.matches('.stop')) {
    taskStatus = { 'completed' : false, 'paused' : false,
      'inProgress' : false, 'notStarted' : true };
    task = {'id' : id, status : taskStatus};
    dataServices.updateTaskStatus(task, function(err) {
      if(!err) {
        location.reload(true);
      } else {
        // TODO: notify user if there's and error and leave as is
      }
    });
  } else if (event.target.matches('.undo-completed-task')) {
    // change the completed task status to inProgress and delete the newly 
    // created task. 
    taskStatus = { 'completed' : false, 'paused' : true, 
      'inProgress' : false, 'notStarted' : false };
    task = { 'id' : id, status : taskStatus };
    dataServices.updateTaskStatus(task, function() {
      dataServices.deleteAutoCreatedTask(id, function(err, task) {
        if(!err) {
          location.reload(true);
        } else {
          // TODO: notify user if there's an error and leave as it
        }
      });
    });
  } else if (event.target.matches('.skip')) {
    // Create a new task based on the cadence of the current task. 
    // Since the current task is being skipped it can be permanately deleted. 
    makeNewTask(id, function(err, newTask) {
      if(!err) {
        dataServices.deleteTask(id, function(err) {
          if(!err) {
            saveTask(newTask, function(err) {
              // Getting an err is normal if I'm passing in a null task
              // which would be the case if this is a non-recurring task.
              if(err) {
                console.log(err.message);
              } else {
                location.reload(true);
              }
            });
            if(err) {
              console.log(err.message + ' taskID: ' + id);
            }
          } else {
            console.log('Error deleting task: ' + id);
          }
        });
      } else {
        // TODO: notify user via flash or something else
      }
    });
  } else if (event.target.matches('.delete-task-icon')) {
    console.log('delete me');
    // Change the task status to deleted and set the deleted date. 
    taskStatus = { 'completed' : false, 'paused' : false, 'inProgress' : false,
      'notStarted' : false, 'deleted' : true };
    task = { 'id' : id, status : taskStatus, deletedDate : new Date()};
    dataServices.updateTaskStatus(task, function(err) {
      if(!err) {
        location.reload(true);
      } else {
        // TODO: notiny user if there's an error
      }
    });
  } 
});

// make a new task object and return it to the callback.  
// This is intended to be called when a task with a cadence is completed and 
// a new task needs to be completed based on the cadence. 
// takes a templateId as an argument and returns the new task to the callback
// The templateId is, right now, the previously completed task
var makeNewTask = function (templateId, callback) {
  // find the template task in order to use it as a template to create the
  // new task
  dataServices.getTask(templateId, function(err, template) {
    // find the next due date, using the the previous task as a starting point 
    var nextDueDate = '';
    // if there's no frequency then it's a one-time task, so I'm not going to 
    // create a new task. 
    if (template.frequency) {
      var completedDate = moment(template.completedDate);
      if (template.frequency.cadence == 'Minute') {
        nextDueDate = completedDate.add(template.frequency.time, 'minutes'); 
      } else if (template.frequency.cadence == 'Hour') {
        nextDueDate = completedDate.add(template.frequency.time, 'hours');
      } else if (template.frequency.cadence == 'Day') {
        nextDueDate = completedDate.add(template.frequency.time, 'days');
      } else if (template.frequency.cadence == 'Week') {
        nextDueDate = completedDate.add(template.frequency.time, 'weeks');
      } else if (template.frequency.cadence == 'Month') {
        nextDueDate = completedDate.add(template.frequency.time, 'months');
      } else if (template.frequency.cadence == 'Year') {
        nextDueDate = completedDate.add(template.frequency.time, 'years');
      }
      // the new task 
      var task = {
        dueDate : nextDueDate.toDate(),
        createdDate : new Date(),
        title : template.title, 
        description : template.description,
        status : {
          completed : false, 
          pause : false,
          inProgress : false,
          notStarted : true,
        },
        frequency : template.frequency,
        _category : template._category,
        _owner : template._owner,
        _createdBy : template._createdBy,
        _previousTask : template.id
      };
      return callback('', task);
    } else {
      return callback( { 'message' : 'No recurrence on this task. ' + 
        'No new task has been created'}, '');
    }
  });
};

var saveTask = function(task, callback) {
// Save the new task to the db, but only if a non-null task was passed in.
  if (task) {
    dataServices.createNewTask(task, function(err, task) {
      if(!err) {
        return callback('', task);
      } else {
        return callback({ 'message' : 'Error in schedules.js - saveTask ' + 
          'function. Database error when saving new task'}, task);
      }
    });
  } else {
    return callback({ 'message' : 'Error In schedules.js - saveTask Function.' + 
      ' task to save is null. Nothing to save'}, '');
  }
};

/*
var addTaskToCompleted = function (taskId, callback) {
  //walk the DOM up and find the taskItem class, which is the wrapper for an
  //individual task. Once I find it, stuff the task under the completed column
  var taskItem = document.getElementById(taskId); 
  do {
    taskItem = taskItem.parentNode;
  } while (!taskItem.matches('.task-item')); 
  document.getElementById('completed-column').appendChild(taskItem);
  return callback();
};
*/