const Database = require('../src/server/database');
const moment = require('moment');

// edit task get route handler
exports.editTaskGet = function (req, res) {
  const sessionId = req.session.sessionId ? req.session.sessionId : null,
    taskId = req.params.id,
    db = new Database();

  let cadenceMinute = false,
    cadenceHour = false,
    cadenceDay = false,
    cadenceWeek = false,
    cadenceMonth = false,
    cadenceYear = false;

  db.initialize(sessionId, (err) => {
    if (err) {
      res.status(500).json({ 'error': err });
    } else {
      db.getTaskById({ 'id': taskId, 'populateCreatedBy': true, 'populateOwner': true, 'populateCategory': true }, (err, task) => {
        db.getAllUsers({}, (err, users) => {
          db.getAllCategories({ 'populateColor': true }, (err, categories) => {
            // Find the frequency cadence to pass to the view which will be used to
            // choose the 'selected' option in the cadence dropdown
            switch (task.frequency.cadence) {
              case null:
                break;
              case 'Minute':
                cadenceMinute = true;
                break;
              case 'Hour':
                cadenceHour = true;
                break;
              case 'Day':
                cadenceDay = true;
                break;
              case 'Week':
                cadenceWeek = true;
                break;
              case 'Month':
                cadenceMonth = true;
                break;
              case 'Year':
                cadenceYear = true;
                break;
              default:
                break;
            }
            var context = {
              message: req.flash('error'),
              loggedInUserFullName : req.user.firstName + ' ' +
                req.user.lastName,
              taskId: task.id,
              dueDate: task.dueDate,
              createdDate: task.createdDate,
              title: task.title,
              description: task.description,
              frequencyTime: task.frequency.time,
              frequencyCadence: task.frequency.cadence,
              cadenceMinute: cadenceMinute,
              cadenceHour: cadenceHour,
              cadenceDay: cadenceDay,
              cadenceWeek: cadenceWeek,
              cadenceMonth: cadenceMonth,
              cadenceYear: cadenceYear,
              createdById: task._createdBy.id,
              createdBy: task._createdBy.firstName + ' ' + task._createdBy.lastName,
              ownerId: task._owner.id,
              ownerFullName: task._owner.firstName + ' ' + task._owner.lastName,
              categoryId: task._category.id,
              categoryName: task._category.name,
              users: users.map(function (user) {
                return {
                  id: user.id,
                  fullName: user.firstName + ' ' + user.lastName,
                  archived: user.archived
                };
              }),
              categories: categories.map(function (category) {
                return {
                  id: category.id,
                  category: category.name,
                  colorId: category._color.id,
                  colorName: category._color.name,
                  colorBgHex: category._color.bgHex,
                  colorFgHex: category._color.fgHex,
                  archived: category.archived
                };
              })
            };
            if (!err) {
              res.render('edit-task', context);
            } else {
              console.log('Error in /task/edit/:id');
              console.log(err);
            }

          });
        });
      });
    }
  });
};

exports.addTaskGet = function(req, res) {
  const sessionId = req.session.sessionId ? req.session.sessionId : null,
    db = new Database();

  db.initialize(sessionId, (err) => {
    if(err) {
      res.status(500).json({ 'error': err });
    } else {
      db.getAllCategories({ 'populateColor': true }, (err, categories) => {
        db.getAllUsers({}, (err, users) => {
          var context = {
            message : req.flash('error'),
            loggedInUserId : req.user.id,
             loggedInUserFullName : req.user.firstName + ' ' +
               req.user.lastName,
            currentDateTime : moment(),
            categories : categories.map(function(category) {
              return {
                id : category.id,
                category : category.name,
                colorName : category._color.name,
                colorBgHex : category._color.bgHex,
                colorFgHex : category._color.fgHex,
                archived : category.archived
              };
            }),
            users : users.map(function(user) {
              return {
                id : user.id,
                fullName : user.firstName + ' ' + user.lastName,
                archived : user.archived
              };
            })
          };
          //TODO: implement csrf
          // res.render('add-task', {csrf: 'csrf token goes here'}, context);
          res.render('add-task', context);
        });
      });
    }
  });
    
};

exports.addTaskPost = function(req, res) {
  const db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      res.status(500).json({ 'error': err });
    } else {
      // Validate the user input
      if(!req.body['owner-id']) {
        req.flash('error', 'The task needs an owner');
        return res.redirect(303, '/add-task');
      }
      if(!req.body['category-id']) {
        req.flash('error', 'There\'s no category');
        return res.redirect(303, '/add-task');
      }
      if(!req.body['due-date']) {
        res.render('/add-task');
        return res.redirect(303, '/add-task');
      }
      if(!req.body.title) {
        req.flash('error', 'A task without a title isn\'t very useful');
        return res.redirect(303, '/add-task');
      }
    }
  });
  
  var newTask = {
    dueDate : moment(req.body.dueDate),
    createdDate : moment(),
    title : req.body.title,
    description : req.body.description,
    status: {
      completed : false,
      paused : false,
      inProgress : false,
      notStarted : true
    },
    frequency : {
      time : req.body.frequency,
      cadence : req.body['frequency-cadence']
    },
    _category : req.body['category-id'],
    _owner : req.body['owner-id'],
    _createdBy : req.user.id,
  };

  db.saveNewTask(newTask, (err, task) => {
    if(err) {
      res.status(500).json({ 'error': err });
      req.session.flash = {
        type : 'danger',
        intro : 'wooahhh pardner!',
        message : 'huge error coming your way!',
      };
      return res.redirect(303, '/add-task');
    } else {
      req.session.flash = {
        type: 'success',
        intro : 'grats!',
        message : 'you have added a new task',
      };
      // Push the taskId to user.ownedTasks
      db.pushTaskToUserOwnedTasks({
        'userId' : req.user.id, 
        'taskId' : task.id
      }, function(err) {
        // Update tasksWithCategory in the category model. 
        db.getCategoryById(req.body['category-id'], (err, category) => {
          category._tasksWithCategory.push( task.id);
          db.findCategoryByIdAndUpdate(category.id, category, (err, category) => {
            if(err) {
              //TODO: if this fails I need to rollback the saved task and notify
              //the user (flash) because the database will be inconsistent if
              //this doesn't complete. I need to read more about err in mongoose
              //to figure this out a bit more
            } else {
              return res.redirect(303, '/tasks');
            }
          });
        });
      });
    }
  });
};

// edit task post handler
exports.editTaskPost = function (req, res) {
  const taskId = req.body['task-id'] || null,
    owner = req.body['owner-id'] || null, 
    category = req.body['category-id'] || null,
    dueDate = new moment(req.body['due-date']) || null,
    title = req.body.title || null,
    description = req.body.description || null;

  let frequency = {},
    db = new Database();

  // If there is a frequency selected in the form then the task will be 
  // updated to reflect that. 
  // If there is no frequency selected in the form then frequency.time
  // and frequency.cadence still have to be populated to update the task. 
  if (req.body.frequency) {
    frequency = {
      time: req.body.frequency,
      cadence: req.body['frequency-cadence']
    };
  } else {
    frequency = {
      time: null,
      cadence: null
    };
  }

  // Validate the user input
  if (!req.body['owner-id']) {
    req.flash('error', 'The task needs an owner');
    return res.redirect(303, '/task/edit/' + req.body['task-id']);
  }
  if (!req.body['category-id']) {
    req.flash('error', 'There\'s no category');
    return res.redirect(303, '/task/edit/' + req.body['task-id']);
  }
  if (!req.body['due-date']) {
    res.render('/add-task');
    return res.redirect(303, '/add-task');
  }
  if (!req.body.title) {
    req.flash('error', 'A task without a title isn\'t very useful');
    return res.redirect(303, '/task/edit/' + req.body['task-id']);
  }
  // Description is optional so not included in validation. 

  const updatedTask = {
    _owner: owner,
    _category: category,
    dueDate: dueDate,
    frequency: frequency,
    title: title,
    description: description
  };

  db.initialize(req.session.sessionId, (err) => {
    db.getTaskById({ 'id': taskId }, (err, oldTask) => {
      db.findTaskByIdAndUpdate(taskId, updatedTask, (err, task) => {
        if (err) {
          console.log('Error in app.post/edit-task');
        } else {
          // If the task owner has changed update userOwnedTasks in the old
          // and new owner.
          if (oldTask._owner !== updatedTask._owner) {
            db.pushTaskToUserOwnedTasks({
              'userId': updatedTask._owner,
              'taskId': oldTask.id
            }, function (err) { });
            db.removeTaskFromUserOwnedTasks({
              'userId': oldTask._owner,
              'taskId': oldTask.id
            }, function (err) { });
          }
          // If the category has changed update tasksWithCategory in the 
          // old and new categories
          if (oldTask._category !== category) {
            db.getCategoryById(oldTask._category, (err, oldCategory) => {
              db.getCategoryById(category, (err, newCategory) => {
                var index = -1;
                if (!err && oldCategory) {
                  index = oldCategory._tasksWithCategory.findIndex(function (element) {
                    return element === oldTask.id;
                  });
                  if (index >= 0) {
                    oldCategory._tasksWithCategory.splice(index, 1);
                    newCategory._tasksWithCategory.push(oldTask.id);
                    db.findCategoryByIdAndUpdate(
                      oldCategory.id, oldCategory, (err) => {
                      if (!err) {
                        db.findCategoryByIdAndUpdate(
                          newCategory.id, newCategory, (err) => {
                          if (!err) {
                            return res.redirect(303, '/tasks');
                          } else {
                            console.log('Error ' + err);
                          }
                        });
                      } else {
                        console.log('Error ' + err);
                      }
                    });
                  }
                }
              });
            });
          } else {
            return res.redirect(303, '/tasks');
          }
        }
      });
    });
  });

};

exports.tasks = (req, res) => {
  let sessionId = req.session.sessionId ? req.session.sessionId : null,
    loggedInUserFullName = req.user.firstName + ' ' +
      req.user.lastName,
    database = new Database(),
    notStartedTasks = [],
    inProgressTasks = [],
    pausedTasks = [],
    completedTasks = [],
    deletedTasks = [];

  database.initialize(sessionId, ((err) => {
    if (err) {
      res.send('Error in database initialization');
    } else {

      database.getAllTasks({ 'populateOwner': true, 'populateCategory': true },
        ((err, tasks) => {
          database.getSettings(((err, settings) => {
            // The number of columns to display in the view.
            // The range is 3-5.
            let columnCount = 3;
            let threeColumn = false;
            let fourColumn = false;
            let fiveColumn = false;

            if (settings.tasks.showCompletedTasks) {
              columnCount++;
            }
            if (settings.tasks.showDeletedTasks) {
              columnCount++;
            }
            switch (columnCount) {
              case 3:
                threeColumn = true;
                break;
              case 4:
                fourColumn = true;
                break;
              case 5:
                fiveColumn = true;
                break;
              default:
                break;
            }

            tasks.forEach(((task) => {
              if (task.status.notStarted) {
                notStartedTasks.push(task);
              } else if (task.status.inProgress) {
                inProgressTasks.push(task);
              } else if (task.status.paused) {
                pausedTasks.push(task);
              } else if (task.status.completed) {
                completedTasks.push(task);
              } else if (task.status.deleted) {
                deletedTasks.push(task);
              }
            }));

            var context = {
              loggedInUserFullName: loggedInUserFullName, 
              notStartedTasks: notStartedTasks.map(((task) => {
                let isOverdue = false,
                  timeOverdue = '';

                if (moment(task.dueDate).isBefore()) {
                  isOverdue = true;
                  timeOverdue = moment(task.dueDate).fromNow(true);
                } else {
                  isOverdue = false;
                }
                return {
                  id: task.id,
                  dueDate: task.dueDate,
                  createdDate: task.createdDate,
                  completedDate: task.completedDate,
                  deletedDate: task.deletedDate,
                  title: task.title,
                  description: task.description,
                  overdue: isOverdue,
                  timeOverdue: timeOverdue,
                  status: task.status,
                  frequencyTime: task.frequency.time || null,
                  frequencyCadence: task.frequency.cadence || null,
                  category: task.category,
                  createdBy: task._createdBy,
                  tenant: task._tenant,
                  previousTasks: task._previousTask,
                  categoryName: task.category.name,
                  categoryBgHex: task.category.color.bgHex,
                  categoryFgHex: task.category.color.fgHex,
                  owner: task.owner.firstName + ' ' + task.owner.lastName,
                  ownerFgHex: task.owner.color.fgHex,
                  ownerBgHex: task.owner.color.bgHex
                };
              })),
              inProgressTasks: inProgressTasks.map(((task) => {
                let isOverdue = false;
                let timeOverdue = '';
                if (moment(task.dueDate).isBefore()) {
                  isOverdue = true;
                  timeOverdue = moment(task.dueDate).fromNow(true);
                } else {
                  isOverdue = false;
                }
                return {
                  id: task.id,
                  dueDate: task.dueDate,
                  createdDate: task.createdDate,
                  completedDate: task.completedDate,
                  deletedDate: task.deletedDate,
                  title: task.title,
                  description: task.description,
                  overdue: isOverdue,
                  timeOverdue: timeOverdue,
                  status: task.status,
                  frequencyTime: task.frequency.time || null,
                  frequencyCadence: task.frequency.cadence || null,
                  category: task.category,
                  createdBy: task._createdBy,
                  tenant: task._tenant,
                  previousTasks: task._previousTask,
                  categoryName: task.category.name,
                  categoryBgHex: task.category.color.bgHex,
                  categoryFgHex: task.category.color.fgHex,
                  owner: task.owner.firstName + ' ' + task.owner.lastName,
                  ownerFgHex: task.owner.color.fgHex,
                  ownerBgHex: task.owner.color.bgHex
                };
              })),
              pausedTasks: pausedTasks.map(((task) => {
                var isOverdue = false;
                var timeOverdue = '';
                if (moment(task.dueDate).isBefore()) {
                  isOverdue = true;
                  timeOverdue = moment(task.dueDate).fromNow(true);
                } else {
                  isOverdue = false;
                }
                return {
                  id: task.id,
                  dueDate: task.dueDate,
                  createdDate: task.createdDate,
                  completedDate: task.completedDate,
                  deletedDate: task.deletedDate,
                  title: task.title,
                  description: task.description,
                  overdue: isOverdue,
                  timeOverdue: timeOverdue,
                  status: task.status,
                  frequencyTime: task.frequency.time || null,
                  frequencyCadence: task.frequency.cadence || null,
                  category: task.category,
                  createdBy: task._createdBy,
                  tenant: task._tenant,
                  previousTasks: task._previousTask,
                  categoryName: task.category.name,
                  categoryBgHex: task.category.color.bgHex,
                  categoryFgHex: task.category.color.fgHex,
                  owner: task.owner.firstName + ' ' + task.owner.lastName,
                  ownerFgHex: task.owner.color.fgHex,
                  ownerBgHex: task.owner.color.bgHex
                };
              })),
              completedTasks: completedTasks.map(((task) => {
                return {
                  id: task.id,
                  dueDate: task.dueDate,
                  createdDate: task.createdDate,
                  completedDate: task.completedDate,
                  deletedDate: task.deletedDate,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                  frequencyTime: task.frequency.time || null,
                  frequencyCadence: task.frequency.cadence || null,
                  category: task.category,
                  createdBy: task._createdBy,
                  tenant: task._tenant,
                  previousTasks: task._previousTask,
                  categoryName: task.category.name,
                  categoryBgHex: task.category.color.bgHex,
                  categoryFgHex: task.category.color.fgHex,
                  owner: task.owner.firstName + ' ' + task.owner.lastName,
                  ownerFgHex: task.owner.color.fgHex,
                  ownerBgHex: task.owner.color.bgHex
                };
              })),
              deletedTasks: deletedTasks.map(((task) => {
                return {
                  id: task.id,
                  dueDate: task.dueDate,
                  createdDate: task.createdDate,
                  completedDate: task.completedDate,
                  deletedDate: task.deletedDate,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                  frequencyTime: task.frequency.time || null,
                  frequencyCadence: task.frequency.cadence || null,
                  category: task.category,
                  createdBy: task._createdBy,
                  tenant: task._tenant,
                  previousTasks: task._previousTask,
                  categoryName: task.category.name,
                  categoryBgHex: task.category.color.bgHex,
                  categoryFgHex: task.category.color.fgHex,
                  owner: task.owner.firstName + ' ' + task.owner.lastName,
                  ownerFgHex: task.owner.color.fgHex,
                  ownerBgHex: task.owner.color.bgHex
                };
              })),
              showCompletedTasks: settings.tasks.showCompletedTasks,
              showDeletedTasks: settings.tasks.showDeletedTasks,
              threeColumn: threeColumn,
              fourColumn: fourColumn,
              fiveColumn: fiveColumn
            };
            res.render('tasks', context);
          }));
        }));
    }
  }));
};
