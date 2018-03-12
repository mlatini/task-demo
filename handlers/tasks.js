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
          db.getCategories({ 'populateColor': true }, (err, categories) => {
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
              // loggedInUserFullName : req.user.firstName + ' ' +
              //   req.user.lastName,
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

// edit task post handler
exports.editTaskPost = function (req, res) {
  // Validate the user input
  if (!req.body.ownerId) {
    req.flash('error', 'The task needs an owner');
    return res.redirect(303, '/task/edit/' + req.body.taskId);
  }
  if (!req.body.categoryId) {
    req.flash('error', 'There\'s no category');
    return res.redirect(303, '/task/edit/' + req.body.taskId);
  }
  if (!req.body.dueDate) {
    res.render('/add-task');
    return res.redirect(303, '/add-task');
  }
  if (!req.body.title) {
    req.flash('error', 'A task without a title isn\'t very useful');
    return res.redirect(303, '/task/edit/' + req.body.taskId);
  }
  var taskId = req.body.taskId;
  var owner = req.body.ownerId;
  var category = req.body.categoryId;
  var dueDate = new moment(req.body.dueDate);
  var frequency = '';
  if (req.body.frequency) {
    frequency = {
      time: req.body.frequency,
      cadence: req.body.frequencyCadence
    };
  }
  var title = req.body.title;
  var description = req.body.description;
  var updatedTask = {
    _owner: owner,
    _category: category,
    dueDate: dueDate,
    frequency: frequency,
    title: title,
    description: description
  };
  Task.findById(taskId, function (err, oldTask) {
    Task.findByIdAndUpdate(taskId, updatedTask, function (err) {
      if (err) {
        console.log('Error in app.post/edit-task');
      } else {
        // If the task owner has changed update userOwnedTasks in the old
        // and new owner.
        if (!oldTask._owner.equals(updatedTask._owner)) {
          database.pushTaskToUserOwnedTasks({
            'userId': updatedTask._owner,
            'taskId': oldTask.id
          }, function (err) { });
          database.removeTaskFromUserOwnedTasks({
            'userId': oldTask._owner,
            'taskId': oldTask.id
          }, function (err) { });
        }
        // If the category has changed update tasksWithCategory in the 
        // old and new categories
        if (!oldTask._category.equals(category)) {
          Category.findById(oldTask._category, function (err, oldCategory) {
            Category.findById(category, function (err, newCategory) {
              var index = -1;
              if (!err && oldCategory) {
                index = oldCategory._tasksWithCategory.findIndex(function (element) {
                  return element.equals(oldTask.id);
                });
                if (index >= 0) {
                  oldCategory._tasksWithCategory.splice(index, 1);
                  newCategory._tasksWithCategory.push(oldTask.id);
                  oldCategory.save(function (err) {
                    if (!err) {
                      newCategory.save(function (err) {
                        if (!err) {
                          return res.redirect(303, '/schedules');
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
          return res.redirect(303, '/schedules');
        }
      }
    });
  });
};

exports.tasks = (req, res) => {
  let sessionId = req.session.sessionId ? req.session.sessionId : null;
  let database = new Database();
  let notStartedTasks = [];
  let inProgressTasks = [];
  let pausedTasks = [];
  let completedTasks = [];
  let deletedTasks = [];

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
