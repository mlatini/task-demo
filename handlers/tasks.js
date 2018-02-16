const Database = require('../src/server/database');
const Settings = require('../models/settings');
const moment = require('moment');

exports.home = (( (req, res) => {
  let sessionId = req.session.sessionId ? req.session.sessionId : null;
  let database = new Database(sessionId);
  let settings = new Settings();
  let notStartedTasks = [];
  let inProgressTasks = [];
  let pausedTasks = [];
  let completedTasks =[];
  let deletedTasks = [];

  database.getAllTasks(( (err, tasks) => {
    database.getSettings(( (err, settings) => {
      console.log('settings in tasks.js', settings);
      // The number of columns to display in the view.
      // The range is 3-5.
      let columnCount = 3;
      let threeColumn = false;
      let fourColumn = false;
      let fiveColumn = false;

      if(settings.tasks.showCompletedTasks) {
        columnCount++;
      }
      if(settings.tasks.showDeletedTasks) {
        columnCount++;
      }
      switch(columnCount) {
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

      tasks.forEach(( (task) => {
        if(task.status.notStarted) {
          notStartedTasks.push(task);
        } else if(task.status.inProgress) {
          inProgressTasks.push(task);
        } else if(task.status.paused) {
          pausedTasks.push(task);
        } else if(task.status.completed){
          completedTasks.push(task);
        } else if(task.status.deleted) {
          deletedTasks.push(task);
        }
      }));

      var context = {
        notStartedTasks: notStartedTasks.map(( (task) => {
          let isOverdue = false;
          let timeOverdue = '';
          if(moment(task.dueDate).isBefore()) {
            isOverdue = true;
            timeOverdue = moment(task.dueDate).fromNow(true);
          } else {
            isOverdue = false;
          }
          return {
            id : task.id,
            dueDate: task.dueDate,
            createdDate: task.createdDate,
            completedDate: task.completedDate,
            deletedDate: task.deletedDate,
            title: task.title,
            description: task.description,
            overdue: isOverdue,
            timeOverdue: timeOverdue,
            status: task.status,
            frequency: task.frequency,
            category: task._category,
            owner: task._owner,
            createdBy: task._createdBy,
            tenant: task._tenant,
            previousTasks: task._previousTask

            /*
            id : notStartedTask._id,
            createdBy : notStartedTask._createdBy.firstName,  
            owner : notStartedTask._owner.firstName,  
            ownerFgHex : notStartedTask._owner.fgHex,
            ownerBgHex : notStartedTask._owner.bgHex,
            dueDate : notStartedTask.dueDate,
            title : notStartedTask.title,
            description : notStartedTask.description,
            overdue : isOverdue,
            timeOverdue : timeOverdue,
            categoryName : notStartedTask._category.name,
            categoryBgHex : notStartedTask._category._color.bgHex,
            categoryFgHex : notStartedTask._category._color.fgHex,
            frequencyTime : notStartedTask.frequency.time,
            frequencyCadence : notStartedTask.frequency.cadence
            */
          };
        })),
        inProgressTasks: inProgressTasks.map(( (task) => {
          let isOverdue = false;
          let timeOverdue = "";
          if(moment(task.dueDate).isBefore()) {
            isOverdue = true;
            timeOverdue = moment(task.dueDate).fromNow(true);
          } else {
            isOverdue = false;
          }
          return {
            dueDate: task.dueDate,
            createdDate: task.createdDate,
            completedDate: task.completedDate,
            deletedDate: task.deletedDate,
            title: task.title,
            description: task.description,
            overdue: isOverdue,
            timeOverdue: timeOverdue,
            status: task.status,
            frequency: task.frequency,
            category: task._category,
            owner: task._owner,
            createdBy: task._createdBy,
            tenant: task._tenant,
            previousTasks: task._previousTask
          };
        })),
        pausedTasks: pausedTasks.map(( (task) => {
          var isOverdue = false;
          var timeOverdue = "";
          if(moment(task.dueDate).isBefore()) {
            isOverdue = true;
            timeOverdue = moment(task.dueDate).fromNow(true);
          } else {
            isOverdue = false;
          }
          return {
            dueDate: task.dueDate,
            createdDate: task.createdDate,
            completedDate: task.completedDate,
            deletedDate: task.deletedDate,
            title: task.title,
            description: task.description,
            overdue: isOverdue,
            timeOverdue: timeOverdue,
            status: task.status,
            frequency: task.frequency,
            category: task._category,
            owner: task._owner,
            createdBy: task._createdBy,
            tenant: task._tenant,
            previousTasks: task._previousTask
          };
        })),
        completedTasks: completedTasks.map(( (task) => {
          return {
            dueDate: task.dueDate,
            createdDate: task.createdDate,
            completedDate: task.completedDate,
            deletedDate: task.deletedDate,
            title: task.title,
            description: task.description,
            status: task.status,
            frequency: task.frequency,
            category: task._category,
            owner: task._owner,
            createdBy: task._createdBy,
            tenant: task._tenant,
            previousTasks: task._previousTask
          };
        })),
        deletedTasks: deletedTasks.map(( (task) => {
          return {
            dueDate: task.dueDate,
            createdDate: task.createdDate,
            completedDate: task.completedDate,
            deletedDate: task.deletedDate,
            title: task.title,
            description: task.description,
            status: task.status,
            frequency: task.frequency,
            category: task._category,
            owner: task._owner,
            createdBy: task._createdBy,
            tenant: task._tenant,
            previousTasks: task._previousTask
          };
        })),
        showCompletedTasks: settings.tasks.showCompletedTasks,
        showDeletedTasks: settings.tasks.showDeletedTasks,
        threeColumn: threeColumn,
        fourColumn: fourColumn,
        fiveColumn: fiveColumn
      };
      res.render('index', context);
    }));
  }));
}));