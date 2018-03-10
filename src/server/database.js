const uuidv1 = require('uuid/v1');
const jsonfile = require('jsonfile');
const HashTable = require('./hashtable');

const Category = require('../../models/category');
const Color = require('../../models/color');
const Settings = require('../../models/settings');
const Task = require('../../models/task');
const User = require('../../models/user');

module.exports = function Database() {
 let tenantId = '';


 this.initialize = function(id, callback) {
  // If the filestore doesn't exist, create
  // the default store. This is meant to be called at application
  // load to make sure there's a default store available. 
  // callback = function(err) 
  if(!id) {
    return callback('Database initialization failed due to invalid id');
  } else {
    tenantId = id;
    const file = 'store/' + tenantId + '.json';
    jsonfile.readFile(file, (err, object) => {
      if(err || !object) {
        Seed(( (err) => {
          if(!err) {
            return callback(null);
          } else {
            return callback('Database initialization failed during readFile');
          }
        }));
      } else {
        return callback(null);
      }
    });
  }
};

  function Seed(callback) {
    // Seed the Database with default data for the current user. 
    // This is intended to be called if a store doesn't exist. 
    let newTask1 = new Task(),
    newTask2 = new Task(),
    newTask3 = new Task(),
    newUser = new User(),
    newSettings = new Settings(),
    red = new Color(),
    black = new Color(),
    white = new Color(),
    lightBlue = new Color(),
    green = new Color(),
    darkBlue = new Color(),
    orange = new Color(),
    purple = new Color(),
    pink = new Color(),
    gettingStartedCategory = new Category(),
    homeCategory = new Category(),
    financeCategory = new Category();

    let newDataStore = {
      tasks: [ ],
      users: [ ],
      colors: [ ],
      categories: [ ]
    };

    // Create the id's first. They are required because users, tasks, etc
    // are linked by their id's. 
    newUser.id = uuidv1();
    newSettings.id = uuidv1();
    newTask1.id = uuidv1();
    newTask2.id = uuidv1();
    newTask3.id = uuidv1();
    gettingStartedCategory.id = uuidv1();
    homeCategory.id = uuidv1();
    financeCategory.id = uuidv1();
    red.id = uuidv1();
    black.id = uuidv1();
    white.id = uuidv1();
    lightBlue.id = uuidv1();
    green.id = uuidv1();
    darkBlue.id = uuidv1();
    orange.id = uuidv1();
    purple.id = uuidv1();
    pink.id = uuidv1();

    // The default user
    newUser.firstName = 'New';
    newUser.lastName = 'User';
    newUser._color = darkBlue.id;
    newUser._settings = newSettings.id;
    newUser._ownedTasks.push(newTask1.id);
    newUser._ownedTasks.push(newTask2.id);
    newUser._ownedTasks.push(newTask3.id);
    newDataStore.users.push(newUser);

    // The default settings
    newSettings.tasks.showCompletedTasks = true;
    newSettings.tasks.showDeletedTasks = true;
    newSettings.categories.showArchivedTasks = true;
    newSettings.admin.showArchivedUsers = true;
    newDataStore.settings = newSettings;


    // The default tasks
    newTask1.dueDate = new Date();
    newTask1.createdDate = new Date();
    newTask1.title = 'Add some categories';
    newTask1.description = 'Click on "Edit Categories" in the navigation ' +
      'bar and add some new categories to use for the demo';
    newTask1.status = {
      completed: false,
      paused: false,
      inProgress: false,
      notStarted: true,
      deleted: false
    };
    newTask1._owner = newUser.id;
    newTask1._createdBy = newUser.id;
    newTask1._category = gettingStartedCategory.id;
    newDataStore.tasks.push(newTask1);

    newTask2.dueDate = new Date();
    newTask2.createdDate = new Date();
    newTask2.title = 'Update your name';
    newTask2.description = 'Click on "Admin" in the navigation bar and ' +
      'change your name from "New User" to something more personal';
    newTask2.status = {
      completed: false,
      paused: false,
      inProgress: false,
      notStarted: true,
      deleted: false
    };
    newTask2._owner = newUser.id;
    newTask2._createdBy = newUser.id;
    newTask2._category = gettingStartedCategory.id;
    newDataStore.tasks.push(newTask2);

    newTask3.dueDate = new Date();
    newTask3.createdDate = new Date();
    newTask3.title = 'Recurring Task';
    newTask3.description = 'Recurring tasks will auto-create a new follow-up ' +
      ' task when completed. Try completing this task to see how that works.'
    newTask3.status = {
      completed: false,
      paused: false,
      inProgress: false,
      notStarted: true,
      deleted: false
    };
    // Recurrence of evey 5 days. 
    newTask3.frequency = {
      'time': 5,
      'cadence': 'Day'
    };
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
    newTask3._owner = newUser.id;
    newTask3._createdBy = newUser.id;
    newTask3._category = gettingStartedCategory.id;
    newDataStore.tasks.push(newTask3);

    // The default categories
    gettingStartedCategory.name = 'getting started';
    gettingStartedCategory.archived = false;
    gettingStartedCategory._color = red.id;
    gettingStartedCategory._tasksWithCategory.push(newTask1.id);
    gettingStartedCategory._tasksWithCategory.push(newTask2.id);
    gettingStartedCategory._tasksWithCategory.push(newTask3.id);
    newDataStore.categories.push(gettingStartedCategory);

    homeCategory.name = 'home';
    homeCategory.archived = false;
    homeCategory._color = lightBlue.id;
    newDataStore.categories.push(homeCategory);

    financeCategory.name = 'finance';
    financeCategory.archived = false;
    financeCategory._color = green.id;
    newDataStore.categories.push(financeCategory);

    // Create a default color set
    red.name = 'red';
    red.bgHex = '#d9534f';
    red.fgHex = '#ffffff';
    newDataStore.colors.push(red);

    black.name = 'black';
    black.bgHex = '#000000';
    black.fgHex = '#ffffff';
    newDataStore.colors.push(black);

    white.name = 'white';
    white.bgHex = '#f9f9f9';
    white.fgHex = '000000';
    newDataStore.colors.push(white);

    lightBlue.name = 'light blue';
    lightBlue.bgHex = '#5bc0de';
    lightBlue.fgHex = '#ffffff';
    newDataStore.colors.push(lightBlue);

    green.name = 'green';
    green.bgHex = '#5cb85c'; 
    green.fgHex = '#ffffff';
    newDataStore.colors.push(green);

    darkBlue.name = 'dark blue';
    darkBlue.bgHex = '#428bca';
    darkBlue.fgHex = '#ffffff'; 
    newDataStore.colors.push(darkBlue);

    orange.name = 'orange';
    orange.bgHex = '#ffa700';
    orange.fgHex = '#000000';
    newDataStore.colors.push(orange);

    purple.name = 'purple';
    purple.bgHex = '#9e379f';
    purple.fgHex = '#ffffff';
    newDataStore.colors.push(purple);

    pink.name = 'pink';
    pink.bgHex = '#e86af0';
    pink.fgHex = '#000000';
    newDataStore.colors.push(pink);

    // Push the new items to the store
    const file = 'store/' + tenantId + '.json';
    jsonfile.writeFile(file, newDataStore, (err) => {
      if(err) {
        return callback('error in Seed function' + err);
      } else {
        return callback(null);
      }
    });
  }

  this.getAllTasks = function(options, callback) {
    // callback = (err, tasks)
    // an object of associated models to query. Valid options are:
    //  owner
    //  category
    // Returns an object with the tasks and any sub-items or an empty object
    // 
    const populateOwner = options.populateOwner || null,
    populateCategory = options.populateCategory || null, 
    file = 'store/' + tenantId + '.json';
    
    let users = new HashTable(),
    categories = new HashTable(),
    colors = new HashTable();

    jsonfile.readFile(file, (err, db) => {
      if(err) { 
        return callback('No tasks returned', null);
      } else {  
        // If populateOwner or populateCategory is paased into options, 
        // the colors will be needed so populate the colors hashTable. 
        if(populateOwner || populateCategory) {
          for(let i = 0, max = db.colors.length; i < max; i += 1) {
            colors.put(db.colors[i].id, db.colors[i]);
          }
        }

        // populate the owner and category Hash Tables, if
        // they are passed with the options argument. 
        if(populateOwner) {
          for(let i = 0, max = db.users.length; i < max; i += 1) {
            users.put(db.users[i].id, db.users[i]);
          }
        }
        if(populateCategory) {
          for(let i = 0, max = db.categories.length; i < max; i += 1) {
            categories.put(db.categories[i].id, db.categories[i]);
          }
        }

        // Populate the owner and category objects of each task, if 
        // options.populateCategory and/or options.populateOwner
        for(let i = 0, max = db.tasks.length; i < max; i +=1) {
          if(populateOwner) {
            let owner = users.get(db.tasks[i]._owner);
            owner.color = colors.get(owner._color);
            db.tasks[i].owner = owner;
          }
          if(populateCategory) {
            let category = categories.get(db.tasks[i]._category);
            category.color = colors.get(category._color);
            db.tasks[i].category = category;
          }
        }
      }
      // Good to go, return the tasks.  
      return callback(null, db.tasks);
    });
  };

  // Get a task from the database by id. 
  // callback(err, task)
  this.getTaskById = function(id, callback) {
    const file = 'store/' + tenantId + '.json', 
      taskId = id || null;

    let returnTask = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
          if(db.tasks[i].id === taskId) {
            returnTask = db.tasks[i];
            break;
          }
        }
        if(returnTask) {
          return callback(null, returnTask);
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };

  this.getTaskByPreviousTaskId = function(id, callback) {
    const file = 'store/' + tenantId + '.json', 
      taskId = id || null;

    let returnTask = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
          if(db.tasks[i]._previousTask === taskId) {
            returnTask = db.tasks[i];
            break;
          }
        }
        if(returnTask) {
          return callback(null, returnTask);
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };

  // Save a new task to the database. 
  // args:
  //  task: a task object
  //  callback(err, task)
  // Returns the newly saved task to the callback. 
  this.saveNewTask = function(task, callback) {
    const file = 'store/' + tenantId + '.json', 
      newTask = task || null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        if(newTask) {
          newTask.id = uuidv1();
          db.tasks.push(newTask);
          jsonfile.writeFile(file, db, (err) => {
            if(!err) {
              return callback(null, newTask);
            } else {
              return callback('err', null);
            }
          });
        }
      } 
      return('Unable to save new task', null);
    });
  };

  // Delete a task from the database. This is a permanent and irreversible
  // delete. A typical use case would be to delete a new auto-created task
  // from the user's task list when when they want to move a completed or 
  // deleted task from their task list. 
  // Another use case would be cleaning out > 72 hour tasks from completed
  // or deleted tasks. 
  // args:
  //  id: task to delete
  //  callback(err, deletedTask(deep copy of task) )
  this.deleteTask = function(id, callback){
    const file = 'store/' + tenantId + '.json',
      taskId = id || null;
     
    let error = null,
      taskToReturn = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        if(taskId) {
          for(let i = 0, max = db.tasks.length; i < max; i += 1) {
            if(db.tasks[i].id === taskId) {
              // Make a deep copy of the task before I delete it from db.
              taskToReturn = JSON.parse(JSON.stringify(db.tasks[i]));
              db.tasks.splice(i, 1);
              jsonfile.writeFile(file, db, (err) => {
                if(err) {
                  return callback(err, null);
                } else {
                  return callback(null, taskToReturn);
                }
              });
            break;
            }
          }
        }
      }
    });
  };

  // Update the task status. 
  // Arguments:
  //  Task object
  //  callback(err, task)
  this.updateTaskStatus = function(task, callback) {
    const file = 'store/' + tenantId + '.json';

    let updatedTask = task || null, 
      taskToUpdate = {};

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
          if(db.tasks[i].id === updatedTask.id) {
            taskToUpdate = db.tasks[i];
            break;
          }
        }
        if(taskToUpdate) {
          taskToUpdate.status.completed = updatedTask.status.completed || false;
          taskToUpdate.status.paused = updatedTask.status.paused || false;
          taskToUpdate.status.inProgress = updatedTask.status.inProgress || false;
          taskToUpdate.status.notStarted = updatedTask.status.notStarted || false;
          taskToUpdate.status.deleted = updatedTask.status.deleted || false;
          taskToUpdate.completedDate = updatedTask.completedDate || '';
          taskToUpdate.deletedDate = updatedTask.deletedDate || '';
          jsonfile.writeFile(file, db, (err) => {
            if(err) {
              return callback(err, null);
            } else {
              return callback(null, taskToUpdate);
            }
          });
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };
  
  this.getSettings = function(callback) {
    const file = 'store/' + tenantId + '.json';

    jsonfile.readFile(file, (err, object) => {
      if(err) {
        return callback(err, null);
      } else {
        return callback(null, object.settings);
      }
    });
  };

  // update the settings. Will either update the schedules, categories
  // or admin depending on what is passed into the function. Note that
  // it can update all of them on a single call.
  // Arguments:
  //  Settings Object
  //  Callback(err, settings)
  this.updateSettings = function(settings, callback) {
    const file = 'store/' + tenantId + '.json';
    jsonfile.readFile(file, (err, db) => {
      if(settings.tasks) {
        if(settings.tasks.showCompletedTasks !== null) {
          db.settings.tasks.showCompletedTasks = settings.tasks.showCompletedTasks;
        }
        if(settings.tasks.showDeletedTasks !== null) {
          db.settings.tasks.showDeletedTasks = settings.tasks.showDeletedTasks;
        }
      }
      if(settings.categories) {
        if(settings.categories.showArchivedTasks !== null) {
          db.settings.categories.showArchivedTasks = settings.categories.showArchivedTasks;
        }
      }
      if(settings.admin) {
        if (settings.admin.showArchivedUsers !== null) {
          db.settings.admin.showArchivedUsers = settings.admin.showArchivedUsers;
        }
      }
      jsonfile.writeFile(file, db, (err) => {
        if(err) {
          return callback(err, null);
        } else {
          return callback(null, db.settings);
        }
      });
    });
  };
};
