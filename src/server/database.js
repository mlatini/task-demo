const uuidv1 = require('uuid/v1');
const jsonfile = require('jsonfile');
const HashTable = require('./hashtable');

const Category = require('../../models/category');
const Color = require('../../models/color');
const Settings = require('../../models/settings');
const Task = require('../../models/task');
const User = require('../../models/user');
const Role = require('../../models/role');

module.exports = function Database() {
 let tenantId = '', 
  file = '';

this.getCurrentTenantId = function() {
  return tenantId;
};

 this.initialize = function(id, callback) {
  // If the filestore doesn't exist, create
  // the default store. This is meant to be called at application
  // load to make sure there's a default store available. 
  // callback = function(err) 
  if(!id) {
    return callback('Database initialization failed due to invalid id');
  } else {
    tenantId = id;
    file = 'store/' + tenantId + '.json';
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
    newTask3 = new Task(),
    newUser1 = new User(),
    newUser2 = new User(),
    newUser3 = new User(),
    newSettings = new Settings(),
    userRole = new Role(),
    adminRole = new Role(),
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
      tasks: [],
      users: [],
      colors: [],
      categories: [],
      roles: []
    };

    // Create the id's first. They are required because users, tasks, etc
    // are linked by their id's. 
    newUser1.id = uuidv1();
    newUser2.id = uuidv1();
    newUser3.id = uuidv1();
    newSettings.id = uuidv1();
    userRole.id = uuidv1();
    adminRole.id = uuidv1();
    newTask1.id = uuidv1();
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

    // The 1st default user
    newUser1.firstName = 'Han';
    newUser1.lastName = 'Solo';
    newUser1._color = darkBlue.id;
    newUser1._settings = newSettings.id;
    newUser1._ownedTasks.push(newTask1.id);
    newUser1._ownedTasks.push(newTask3.id);
    newUser1._roles.push(userRole.id);
    newUser1._roles.push(adminRole.id);
    newDataStore.users.push(newUser1);

    // The 2nd default user
    newUser2.firstName = 'Anakin';
    newUser2.lastName = 'Skywalker';
    newUser2._color = purple.id;
    newUser2._settings = newSettings.id;
    newUser2._roles.push(userRole.id);
    newUser2._roles.push(adminRole.id);
    newDataStore.users.push(newUser2);

    // The 3nd default user
    newUser3.firstName = 'Obi-Wan';
    newUser3.lastName = 'Kenobi';
    newUser3._color = orange.id;
    newUser3._settings = newSettings.id;
    newUser3._roles.push(userRole.id);
    newUser3._roles.push(adminRole.id);
    newDataStore.users.push(newUser3);


    // The default settings
    newSettings.tasks.showCompletedTasks = true;
    newSettings.tasks.showDeletedTasks = true;
    newSettings.tasks.showOnlyMyTasks = true;
    newSettings.categories.showArchivedTasks = true;
    newSettings.admin.showArchivedUsers = true;
    newDataStore.settings = newSettings;

    // The default roles
    userRole.name = 'User';
    adminRole.name = 'Admin';
    newDataStore.roles.push(userRole);
    newDataStore.roles.push(adminRole);

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
    newTask1._owner = newUser1.id;
    newTask1._createdBy = newUser1.id;
    newTask1._category = gettingStartedCategory.id;
    newDataStore.tasks.push(newTask1);


    newTask3.dueDate = new Date();
    newTask3.createdDate = new Date();
    newTask3.title = 'Recurring Task';
    newTask3.description = 'Recurring tasks will auto-create a new follow-up ' +
      ' task when completed. Try completing this task to see how that works.';
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
    newTask3._owner = newUser1.id;
    newTask3._createdBy = newUser1.id;
    newTask3._category = gettingStartedCategory.id;
    newDataStore.tasks.push(newTask3);

    // The default categories
    gettingStartedCategory.name = 'getting started';
    gettingStartedCategory.archived = false;
    gettingStartedCategory._color = red.id;
    gettingStartedCategory._tasksWithCategory.push(newTask1.id);
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
    populateCategory = options.populateCategory || null;
    
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
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
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
      return callback(null, JSON.parse(JSON.stringify(db.tasks)));
    });
  };

  // Get a task from the database by id. 
  // Args:
  // options: 
  //  id: taskId
  //  populateCreatedBy: bool
  //  populateOwner: bool
  //  populateCategory: bool
  //  callback(err, task)
  this.getTaskById = function(options, callback) {

    const taskId = options.id || null,
      populateCreatedBy = options.populateCreatedBy || null,
      populateOwner = options.populateOwner || null,
      populateCategory = options.populateCategory || null;

    let returnTask = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
          if(db.tasks[i].id === taskId) {
            returnTask = db.tasks[i];
            if(populateCreatedBy) {
              let temp = null;
              for(let i = 0, max = db.users.length; i < max; i += 1) {
                if(returnTask._createdBy === db.users[i].id) {
                  temp = db.users[i];
                  returnTask._createdBy = temp;
                  break;
                }
              }
            }
            if(populateOwner) {
              let temp = null;
              for(let i = 0, max = db.users.length; i < max; i += 1) {
                if(returnTask._owner === db.users[i].id) {
                  temp = db.users[i];
                  returnTask._owner = temp;
                  break;
                }
              }
            }
            if(populateCategory) {
              let temp = null;
              for(let i = 0, max = db.categories.length; i < max; i += 1) {
                if(returnTask._category === db.categories[i].id) {
                  temp = db.categories[i];
                  returnTask._category = temp;
                  break;
                }
              }
            }
            break;
          }
        }
        if(returnTask) {
          return callback(null, JSON.parse(JSON.stringify(returnTask)));
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };

  this.getTaskByPreviousTaskId = function(id, callback) {
    const taskId = id || null;

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
          return callback(null, JSON.parse(JSON.stringify(returnTask)));
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };

  // save a new user to the database. 
  // args:
  //  user: a user object
  //  callback(err, user)
  // returns the newly created user to the callback.
  this.saveNewUser = function(user, callback) {
    const newUser1 = user || null;

    let userToSave = {};

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        if(newUser1) {
          userToSave.id = uuidv1();
          userToSave.firstName = newUser1.firstName;
          userToSave.lastName = newUser1.lastName;
          userToSave._roles = [];
          userToSave._ownedTasks = [];
          userToSave.archived = false;
          for(let i = 0, max = db.colors.length; i < max; i += 1) {
            if(db.colors[i].bghex === newUser1.bghex && 
              db.colors[i].fgHex === newUser1.fgHex) {
                userToSave._color = db.colors[i].id;
                break;
              }
          }
          if(newUser1.admin) {
            for(let i = 0, max = db.roles.length; i < max; i += 1) {
              if(db.roles.name === 'Admin' || db.roles.name === 'admin') {
                userToSave._roles.push(db.roles[i].id);
                break;
              }
            }
          } else {
            for(let i = 0, max = db.roles.length; i < max; i += 1) {
              if(db.roles[i].name === 'User' || db.roles.name[i] === 'user') {
                userToSave._roles.push(db.roles[i].id);
                break;
              }
            }
          }
          db.users.push(userToSave);
          jsonfile.writeFile(file, db, (err) => {
            if(!err) {
              return callback(null, JSON.parse(JSON.stringify(newUser1)));
            } else {
              return callback(err, null);
            }
          });
        }
      }
      return('Unable to save new user', null);
    });
  };

  // Save a new task to the database. 
  // args:
  //  task: a task object
  //  callback(err, task)
  // Returns the newly saved task to the callback. 
  this.saveNewTask = function(task, callback) {
    const newTask = task || null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        if(newTask) {
          newTask.id = uuidv1();
          db.tasks.push(newTask);
          jsonfile.writeFile(file, db, (err) => {
            if(!err) {
              return callback(null, JSON.parse(JSON.stringify(newTask)));
            } else {
              return callback(err, null);
            }
          });
        }
      } 
      return('Unable to save new task', null);
    });
  };

  // Save a new category to the database. 
  // args: 
  //  category: a category object
  //  callback(err, category)
  // Returns the newly saved category to the callback. 
  this.saveNewCategory = function(category, callback) {
    const newCategory = category || null, 
      categoryToSave = {};
    
    // Validate the new category and populate categoryToSave before 
    // pushing it to db.categories. 
    if(!newCategory) {
      return callback('The new category is null');
    }

    if(!newCategory.name) {
      return callback('The new category is missing a name');
    } else {
      categoryToSave.name = newCategory.name;
    }

    categoryToSave.archived = newCategory.archived || false;
    
    if(!newCategory._color) {
      return callback('The new category is missing the color');
    } else {
      categoryToSave._color = newCategory._color;
    }

    if(!newCategory._tasksWithCategory) {
      categoryToSave._tasksWithCategory = [];
    }

    categoryToSave.id = uuidv1();

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
          db.categories.push(categoryToSave);
          jsonfile.writeFile(file, db, (err) => {
            if(!err) {
              return callback, null, JSON.parse(JSON.stringify(newCategory));
            } else {
              return callback(err, null);
            }
          });
      }
      return('Unable to save new category', null);
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
    const taskId = id || null;
     
    let taskToReturn = null;

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
                  return callback(null, JSON.parse(JSON.stringify(taskToReturn)));
                }
              });
            break;
            }
          }
        }
      }
    });
  };


  // Update task. This will take a task as an input and update it in the 
  // database.
  //
  // Args:
  //  id: number
  //  task: task object
  //  callback(err, task) - returns the updated task.
  this.findTaskByIdAndUpdate = function(id, task, callback) {
    const updatedTaskId = id || null,
      updatedTask = task || null;
    
    let existingTaskToUpdate = null;
    
    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback(err, null);
      } else {
        for(let i = 0, max = db.tasks.length; i < max; i += 1) {
          if(db.tasks[i].id === updatedTaskId) {
            existingTaskToUpdate = db.tasks[i];
            break;
          }
        }     
        if(existingTaskToUpdate) {
          // Make sure only to update fields that have a value in
          // updatedTask. Other fields will remain as-is. 
          if(updatedTask.dueDate) { 
            existingTaskToUpdate.dueDate = updatedTask.dueDate; 
          }
          if(updatedTask.completedDate) {
            existingTaskToUpdate.completedDate = updatedTask.completedDate;
          }
          if(updatedTask.deletedDate) {
            existingTaskToUpdate.deletedDate = updatedTask.deletedDate;
          }
          if(updatedTask.title) {
            existingTaskToUpdate.title = updatedTask.title;
          }
          if(updatedTask.description) {
            existingTaskToUpdate.description = updatedTask.description;
          }
          if(updatedTask.status) {
            existingTaskToUpdate.status.completed = 
              updatedTask.status.completed || null;
            existingTaskToUpdate.status.paused = 
              updatedTask.status.paused || null;
            existingTaskToUpdate.status.inProgress =
              updatedTask.status.inProgress || null;
            existingTaskToUpdate.status.notStarted =
              updatedTask.status.notStarted || null;
            existingTaskToUpdate.status.deleted =
              updatedTask.status.deleted || null;
          }
          if(updatedTask.frequency) {
              // Created frequency property in case it doesn't exist so I 
              // can assign properties to it. 
              existingTaskToUpdate.frequency = {};
              existingTaskToUpdate.frequency.time = updatedTask.frequency.time;
              existingTaskToUpdate.frequency.cadence = updatedTask.frequency.cadence;
          }
          if(updatedTask._category) {
            existingTaskToUpdate._category = updatedTask._category;
          }
          if(updatedTask._owner) {
            existingTaskToUpdate._owner = updatedTask._owner;
          }
          if(updatedTask._previousTask) {
            existingTaskToUpdate._previousTask = updatedTask._previousTask;
          }
          jsonfile.writeFile(file, db, (err) => {
            if(err) {
              return callback('Error updating the task', null);
            } else {
              return callback(null, JSON.parse(JSON.stringify(existingTaskToUpdate)));
            }
          });
        } else {
          return callback('Task not found', null);
        }
      }
    });
  };

  // Push a task to a user's ownedTasks
  // options : {
  //  userId,
  //  taskId
  //  callback(err)
  this.pushTaskToUserOwnedTasks = function(options, callback) {
    const userId = options.userId || null,
      taskId = options.taskId || null;

    let userToUpdate = null, 
      ownedTaskExists = false;

    // Make sure a valid options object was passed in before continuing.
    if(!userId) {
      return callback('Empty userId');
    } else if(!taskId) {
      return callback('Empty taskId');
    } else {
      // Valid options so continue

      jsonfile.readFile(file, (err, db) => {
        if(err) {
          return callback(err);
        } else {
          // Parse the users and find the right one. 
          for(let i = 0, max = db.users.length; i < max; i += 1) {
            if(db.users[i].id === userId) {
              userToUpdate = db.users[i];
              break;
            }
          }
          // userId not found so return error. 
          if(!userToUpdate) {
            return callback('userId not found');
          } else {
          // If 0 ownedTasks just push it;
            if(userToUpdate._ownedTasks.length <= 0) {
              ownedTaskExists = false;
            } else {
              // if >= 1 ownedTasks, make sure new taskId is unique. 
              for(let i = 0, max = userToUpdate._ownedTasks.length; 
                i < max; i += 1) {
                  if(userToUpdate._ownedTasks[i] === taskId) {
                    ownedTaskExists = true;
                    break;
                  }
              }
            }
          }
          // If the onwed task doesn't exist push it and return.
          if(!ownedTaskExists) {
            userToUpdate._ownedTasks.push(taskId);
            jsonfile.writeFile(file, db, (err) => {
              if(err) {
                return callback('Unable to save updated _ownedTasks');
              } else {
                return callback(null);
              }
            });
          }
        }
      });
    }
  };

  // Remove a task from a user's ownedTasks
  // options : {
  //  userId,
  //  taskId
  this.removeTaskFromUserOwnedTasks = function(options, callback) {
    const userId = options.userId || null,
      taskId = options.taskId || null;

    let userToUpdate = null;

    // Make sure a valid options object was passed in before continuing.
    if(!userId) {
      return callback('Empty userId');
    } else if(!taskId) {
      return callback('Empty taskId');
    } else {
      // Valid options so continue
      jsonfile.readFile(file, (err, db) => {
        if(err) {
          return callback(err);
        } else {
          // Parse the users and find the right one. 
          for(let i = 0, max = db.users.length; i < max; i += 1) {
            if(db.users[i].id === userId) {
              userToUpdate = db.users[i];
              break;
            }
          }
          // userId not found so return error. 
          if(!userToUpdate) {
            return callback('userId not found');
            // If _ownedTasks contains taskId delete it, update the file store.
            // and return callback with a null error. 
            // If _ownedTasks doesn't contain taskId return callback with error. 
          } else {
            let index = userToUpdate._ownedTasks.findIndex((ownedTask) => {
              return options.taskId === ownedTask;
            });
            if(index > -1) {
              userToUpdate._ownedTasks.splice(index, 1);
              jsonfile.writeFile(file, db, (err) => {
                if(!err) {
                  return callback(null);
                } else {
                  return callback('Unable to save updated _ownedTasks');
                }
              });
            } else {
              const error = 'Unable to find the taskId' + taskId + 
                ' in user._ownedTasks';
              return callback(error);
            }
          }
        }
      });
    }
  };
  
  this.getSettings = function(callback) {
    jsonfile.readFile(file, (err, object) => {
      if(err) {
        return callback(err, null);
      } else {
        return callback(null, JSON.parse(JSON.stringify(object.settings)));
      }
    });
  };


  // Get a specific user by id

  // update the settings. Will either update the schedules, categories
  // or admin depending on what is passed into the function. Note that
  // it can update all of them on a single call.
  // Arguments:
  //  Settings Object
  //  Callback(err, settings)
  this.updateSettings = function(settings, callback) {
    jsonfile.readFile(file, (err, db) => {
      if(settings.tasks) {
        if(settings.tasks.showCompletedTasks !== null) {
          db.settings.tasks.showCompletedTasks = settings.tasks.showCompletedTasks;
        }
        if(settings.tasks.showDeletedTasks !== null) {
          db.settings.tasks.showDeletedTasks = settings.tasks.showDeletedTasks;
        }
        if(settings.tasks.showOnlyMyTasks !== null) {
          db.settings.tasks.showOnlyMyTasks = settings.tasks.showOnlyMyTasks;
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
          return callback(null, JSON.parse(JSON.stringify(db.settings)));
        }
      });
    });
  };

  this.getAllUsers = function(options, callback) {
    // args:
    //  options:
    //    populateRoles
    //    populateOwnedTasks
    //    populateColor
    //  callback(err, users)
    const populateRoles = options.populateRoles || null, 
      populateOwnedTasks = options.populateOwnedTasks || null, 
      populateColor = options.populateColor || null;

    let roles = new HashTable(),
      tasks = new HashTable(),
      colors = new HashTable();

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback('No users returned', null);
      } else {
        if(populateRoles) {
          db.roles.forEach( (role) => {
            roles.put(role.id, role);
          });
          db.users.forEach( (user) => {
            let userRoles = [];
            user._roles.forEach( (role) => {
              userRoles.push(roles.get(role));
            });
            user._roles = userRoles;
          });
        }
        if(populateOwnedTasks) {
          db.tasks.forEach((task) => {
            tasks.put(task.id, task);      
          });
          db.users.forEach( (user) => {
            let userTasks = [];
            user._ownedTasks.forEach( (task) => {
              userTasks.push(tasks.get(task));
            });
            user._ownedTasks = userTasks;
          });
        }
        if(populateColor) {
          db.colors.forEach((color) => {
            colors.put(color.id, color);
          });
          db.users.forEach( (user) => {
            let userColor = '';
            userColor = colors.get(user._color);
            user._color = userColor;
          });
        }
        return callback(null, JSON.parse(JSON.stringify(db.users)));
      }
    });
  };

  this.getAllColors = function(options, callback) {
    // args:
    //  options: not used yet. Here for future expansion so I don't have 
    //    to change th interface if I want to add options. 
    //  callback(err, colors)
    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback('No colors returned', null);
      } else {
        return callback(null, JSON.parse(JSON.stringify(db.colors)));
      }
    });
  };

  this.getCategoryById = function(id, callback) {
    // Find a single category by Id and return it to the callback. 
    // args:
    //  id
    //  callback(err, category);
    const categoryId = id || null;

    let categoryToReturn = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback('Error reading database');
      } else {
        for(let i = 0, max = db.categories.length; i < max; i += 1) {
          if(db.categories[i].id === categoryId) {
            categoryToReturn = db.categories[i];
            break;
          } 
        }
        if(categoryToReturn) {
          return callback(null, JSON.parse(JSON.stringify(categoryToReturn)));
        }
      }
    });
  };

  this.getAllCategories = function(options, callback) {
    // args:
    //  options:
    //    populateColor: bool
    //    populateTasksWithCategory: bool
    //    callback(err, categories)

    const populateColor = options.populateColor || null, 
      populateTasksWithCategory = options.populateTasksWithCategory || null;

    let categoriesToReturn = [], 
      colors = new HashTable(),
      tasks = new HashTable();

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback('No categories returned', null);
      } else {
        categoriesToReturn = db.categories;
        if(populateColor) {
          for(let i = 0, max = db.colors.length; i < max; i += 1) {
            colors.put(db.colors[i].id, db.colors[i]);
          }
          for(let i = 0, max = categoriesToReturn.length; i < max; i += 1) {
            let colorTemp = colors.get(categoriesToReturn[i]._color);
            // Every category has a color so not necessary to validate
            categoriesToReturn[i]._color = colorTemp;
          }
        }
        if(populateTasksWithCategory) {
          for(let i = 0, max = db.tasks.length; i < max; i += 1) {
            tasks.put(db.tasks[i].id, db.tasks[i]);
          }
          categoriesToReturn.forEach( (categoryToReturn) => {
            let tasksWithCategory = [];
              if(categoryToReturn._tasksWithCategory.length >= 1) {
                categoryToReturn._tasksWithCategory.forEach( (taskWithCategory) => {
                  tasksWithCategory.push(tasks.get(taskWithCategory));
                });
              }
            categoryToReturn._tasksWithCategory = tasksWithCategory;
          });
        }
      return callback(null, JSON.parse(JSON.stringify(categoriesToReturn)));
      }
    });
  };


  // Update users. This will take a user as an input and update it in the db. 
  //
  //  Args:
  //    options {
  //    user: based on mongoose model
  //    roles: string array of roles
  //    currentlyAdmin: bool indicating if user is currently in admin role
  //    currentlyUser: bool indicating if user is currently in user role
  //  }
  //    callback(err, user)
  this.findUserByIdAndUpdate = function(options, callback) {
    const updatedUser = options.user || null,
      roles = options.roles || null,
      currentlyAdmin = options.currentlyAdmin,
      currentlyUser = options.currentlyUser;

    let userToUpdate = {};

    if(updatedUser === null || roles === null || currentlyAdmin === null || 
      currentlyUser === null) {
        return callback('Invalid arguments passed to findUserByIdAndUpdate', null);
      } else {
        jsonfile.readFile(file, (err, db) => {
          if(err) {
            return callback('Unable to open database', null);
          } else {
            // find the user to update
            for(let i = 0, max = db.users.length; i < max; i += 1) {
              if(db.users[i].id === updatedUser.id) {
                userToUpdate = db.users[i];
                break;
              }
            }
            if(updatedUser.firstName !== null && 
              updatedUser.firstName !== undefined) {
                userToUpdate.firstName = updatedUser.firstName;
            } 
            if(updatedUser.lastName !== null && 
              updatedUser.lastName !== undefined) {
                userToUpdate.lastName = updatedUser.lastName;
            } 
            if(updatedUser._color !== null &&
              updatedUser._color !== undefined) {
                userToUpdate._color = updatedUser._color;
            }
            if(updatedUser._roles !== null && 
              updatedUser._roles !== undefined) {
                updatedUser._roles.forEach((updatedRole) => {
                  let roleMatch = false;
                  userToUpdate._roles.forEach((currentRole) => {
                    if(currentRole.id === updatedRole.id) {
                      roleMatch = true;
                    }
                  });
                  if(roleMatch === false) {
                    userToUpdate._roles.push(updatedRole);
                  }
                });
            }
            if(updatedUser.archived !== null && 
              updatedUser.archived !== undefined) {
                userToUpdate.archived = updatedUser.archived;
            }
            jsonfile.writeFile(file, db, (err) => {
              if(err) {
                return callback('Error saving user to database', null);
              } else {
                return callback(null, JSON.parse(JSON.stringify(userToUpdate)));
              }
            });
          }
        });
      }
  };

  // Update category. This will take a category as an input and update it 
  // in the database. 
  //
  // Args:
  //  id: number
  //  category: category object
  //  callback(err, category) - returns the updated category.
  this.findCategoryByIdAndUpdate = function(id, category, callback) {
    const updatedCategoryId = id || null,
      updatedCategory = category || null;

    let existingCategoryToUpdate = null;

    jsonfile.readFile(file, (err, db) => {
      if(err) {
        return callback('Unable to open database', null);
      } else {
        for(let i = 0, max = db.categories.length; i < max; i += 1) {
          if(db.categories[i].id === updatedCategoryId) {
            existingCategoryToUpdate = db.categories[i];
            break;
          }
        }
        if(existingCategoryToUpdate !== null) {
          // Make sure to only update fields that have a value in
          // updatedCategory. Other fields will remain as-is. 
          if(updatedCategory.name !== null && 
            updatedCategory.name !== undefined) {
              existingCategoryToUpdate.name = updatedCategory.name;
          }
          if(updatedCategory.archived !== null && 
            updatedCategory.archived !== undefined) {
              existingCategoryToUpdate.archived = updatedCategory.archived;
          }
          if(updatedCategory._color !== null && 
            updatedCategory._color !== undefined) {
              existingCategoryToUpdate._color = updatedCategory._color;
          }
          if(updatedCategory._tasksWithCategory !== null && 
            updatedCategory._tasksWithCategory !== undefined) {
              existingCategoryToUpdate._tasksWithCategory = 
                updatedCategory._tasksWithCategory;
          }
          jsonfile.writeFile(file, db, (err, db) => {
            if(err) {
              return callback('error when writing category to database');
            } else {
              return callback(null, JSON.parse(JSON.stringify(
                existingCategoryToUpdate)));
            }
          });
        } else {
          return callback('Unable to find category to update in database', null);
        }
      }
    });
  };
};
