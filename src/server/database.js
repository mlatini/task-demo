const uuidv1 = require('uuid/v1');
const jsonfile = require('jsonfile');

const Category = require('../../models/category');
const Color = require('../../models/color');
const Role = require('../../models/role');
const Settings = require('../../models/settings');
const Task = require('../../models/task');
const User = require('../../models/user');

module.exports = function Database(tenantId) {
 let tasks = [];
 let settings = new Settings();

 this.initialize = function(callback) {
  // Load the database filestore. If it doesn't exist, create
  // the default store. 
  const file = 'store/' + tenantId + '.json';
  jsonfile.readFile(file, (err, object) => {
    if(err || !object) {
      createDefaultStore(( (err) => {
        if(!err) {
          console.log('default store created');
          return callback(null);
        } else {
          return callback(err);
        }
      }));
    } else {
      return callback(null);
    }
  });
 };

  function createDefaultStore(callback) {
    // Create a default store for the current user. This is intended to 
    // be called if a store doesn't exist. 
    let newTask1 = new Task();
    let newTask2 = new Task();
    let newUser = new User();
    let newSettings = new Settings();
    let red = new Color();
    let black = new Color();
    let white = new Color();
    let lightBlue = new Color();
    let green = new Color();
    let darkBlue = new Color();
    let orange = new Color();
    let purple = new Color();
    let pink = new Color();
    let gettingStartedCategory = new Category();
    let homeCategory = new Category();
    let financeCategory = new Category();

    let newDataStore = {
      tasks: [

      ],
      users: [

      ],
      colors: [

      ],
      categories: [

      ]
    };

    // Create the id's first. They are required because users, tasks, etc
    // are linked by their id's. 
    newUser.id = uuidv1();
    newSettings.id = uuidv1();
    newTask1.id = uuidv1();
    newTask2.id = uuidv1();
    gettingStartedCategory.id = uuidv1();
    homeCategory.id = uuidv1();
    financeCategory = uuidv1();
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
    newUser.name = 'New User';
    newUser._color = darkBlue.id;
    newUser._settings = newSettings.id;
    newUser._ownedTasks.push(newTask1.id);
    newUser._ownedTasks.push(newTask2.id);
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

    // The default categories
    gettingStartedCategory.name = 'getting started';
    gettingStartedCategory.archived = false;
    gettingStartedCategory._color = red.id;
    gettingStartedCategory._tasksWithCategory.push(newTask1.id);
    gettingStartedCategory._tasksWithCategory.push(newTask2.id);
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
        console.error('error in createDefaultStore' + err);
      } else {
        console.log('successfully pushed default settings to ' +
          'the store', newDataStore);
        return callback(null);
      }
    });
  }
  
  this.getAllTasks = function(callback) {
    const file = 'store/' + tenantId + '.json';
    jsonfile.readFile(file, (err, object) => {
      if(err) {
        return callback(err, null);
      } else {
        return callback(null, object.tasks);
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
};
