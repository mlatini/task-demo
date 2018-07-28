/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 131);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

// DATA-SERVICES.JS
//
// This file will hold all the functions needed to query or update the 
// database, or otherwise manipulate


// Updated functions start

//Update the settings
exports.updateSettings = function(settings, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/settings/update';
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ 'settings': settings }));
};

// call /task/id post method which will update the task that's 
// passed to it. 
exports.updateTaskStatus = function(task, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/task/update-status';
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ 'task': task }));
};

// Call /api/user/get-all-users to get all the users. 
// callback(err, users)
exports.getAllUsers = function(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      if(JSON.parse(this.responseText).users.length >= 1) {
        return callback(null, JSON.parse(this.responseText).users);
      } else {
        return callback('ERR: no users returned', null);
      }
    }
  };
  xhttp.open('GET', '/api/user/get-all-users', true);
  xhttp.send();
};

// Updated functions end. 

// call /colors get method to query the database and get a list
// of colors
// If colors length is > 1 then return an array of colors
// If anything else, return an error. 
exports.getColors = function(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      if (JSON.parse(this.responseText).colors.length >= 1) {
        return callback('',JSON.parse(this.responseText).colors);
      } else {
        return callback('ERR: No colors returned', '');
      }
    }
  };
  xhttp.open('GET', '/api/get-all-colors', true);
  xhttp.send();
};

// call /color get method to get one single color
exports.getColor = function(colorName, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      if (JSON.parse(this.responseText).color) {
        return callback('',JSON.parse(this.responseText).color);
      } else {
        return callback('ERR: No colors returned', '');
      }
    }
  };
  var url = '/color/' + colorName; 
  xhttp.open('GET', url, true);
  xhttp.send();
}; 

// call /new-category post method to save the new 
// category to the db. 
// return an error if the save is not successful
exports.postCategory = function(category, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', '/api/category/save-new', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify( { 'category': category }));
  // TODO: check for error response from post and return to the
  // calling function if it's present. 
  return callback('');
}; 

// call /api/register post method to save the new user to the database
exports.postUser = function(user, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('POST', '/api/user/save-new-user', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ 'user': user }));
  // wait for the callback so I can return the new user
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      if (JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error, null);
      } else {
        return callback(null,JSON.parse(this.responseText));
      }
    }
  };
};

// call /api/user/update post method to save the edited user to the db.
// Arguments: 
//  1 - options: 
//    user: based on mongoose model
//    roles: string array of roles
//    currentlyAdmin: bool indicating if user is currently in admin role
//    currentlyUser: bool indicating if user is currently in user role
//  2 - callback: returns (err, updatedUser) 
exports.updateUser = function(options, callback) {
  // Make sure all the options are valid
  if(!options.user) {
    return callback({ 
      'msg' : 'A user object was not passed to exports.updateUser in ' +
      'data-services'
    }, null);
  } else if(!options.roles) {
    return callback({
      'msg' : 'A role array was not passed to exports.updateUser in ' +
      'data-services'
    }, null);
  } else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        if(JSON.parse(this.responseText).error) {
          return callback(JSON.parse(this.responseText).error, null);
        } else {
          return callback('', JSON.parse(this.responseText).user);
        }
      }
    };
    var url = '/api/user/update';
    xhttp.open('POST', url, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send(JSON.stringify(options));
  }
};
// call /new-task post method to save a new task and save it to the db.
// Args:
//  task: a task object to create and save to the db. 
//  callback(err, task)
// return the new task in the callback
exports.createNewTask = function(task, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200) {
      if (JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error, null);
      } else {
        return callback(null, JSON.parse(this.responseText).task);
      }
    }
  };
  xhttp.open('POST', '/api/task/save-new-task', true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify({ 'task': task }));
};

// Call /task get method to get one single task 
// callback(err, task)
exports.getTask = function(taskId, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error, null);
      } else {
        return callback(null, JSON.parse(this.responseText).task);
      }
    }
  };
  var url = '/api/task/get-task/' + taskId;
  xhttp.open('GET', url, true);
  xhttp.send();
};

// This will be called to delete a task that was auto-created from using
// the current task as a template. This is typically done when a user
// completes a task which has recurrence, and a new task has been created 
// when the original task was flagged as completed.  
// This function will typically be called when a user has undone a 
// completed task, so the new task must be deleted to prevent a duplicate. 
// Args:
//  taskId: the taskId of the previous task, not the one to be deleted. 
//    I will use this to find the previousTaskId of the task to be deleted.
//  callback(err, deletedTask)
exports.deleteAutoCreatedTask = function(taskId, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback(null, JSON.parse(this.responseText).task);
      }
    }
  };
  var url = '/api/task/delete-previous/' + taskId;
  xhttp.open('POST', url, true);
  xhttp.send();
};

// This will permanently delete a task. Typical use case would be deleting 
// when skipping a task
exports.deleteTask = function(id, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/task/delete/' + id;
  xhttp.open('POST', url, true);
  xhttp.send();
};

// call /api/categories/edit post method which will update the category that's
// passed to it
exports.updateCategory = function(category, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('', JSON.parse(this.responseText).category);
      }
    }
  };
  var url = '/api/category/update/';
  xhttp.open('POST', url, true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(category));
};

// call /api/categories/archive/:id post method which will archive the category
exports.archiveCategory = function(id, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/category/archive/' + id;
  xhttp.open('POST', url, true);
  xhttp.send();
}; 

// call /api/categories/unArchive/:id post method which will archive the category
exports.unArchiveCategory = function(id, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/category/un-archive/' + id;
  xhttp.open('POST', url, true);
  xhttp.send();
}; 

// call /api/users/archive/:id post method which will archive the user
exports.archiveUser = function(id, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/user/archive/' + id;
  xhttp.open('POST', url, true);
  xhttp.send();
}; 

// call /api/users/unArchive/:id post method which will archive the user
exports.unArchiveUser = function(id, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      if(JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error);
      } else {
        return callback('');
      }
    }
  };
  var url = '/api/user/unArchive/' + id;
  xhttp.open('POST', url, true);
  xhttp.send();
}; 
  


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

var dataServices = __webpack_require__(1);
var common = __webpack_require__(2);

window.onload = function() {
  common.populateUsersDropdown();
  // Highlight the page in the navbar
  document.getElementById('admin-link').classList.toggle('active-page-link');
};

// When the user clicks on the newUser button, show the add user portion of
// the view
document.getElementById('new-user-button').onclick = function () {
  activateNewUserMode();
};

// When the user clicks on cancel when adding a new user reset the view
document.getElementById('cancel-create-user-button').onclick = function () {
  cancelNewUserMode();
};

// When the user clicks on the createUser button show the create user fields
document.getElementById('create-user-button').onclick = function () {
  saveNewUser();
};

// When the user clicks on the 'show archived users' checkbox, save the changes
// to the database and refresh the page
document.getElementById('show-archived-users-check').onclick = function () {
  var isChecked = this.checked;
  var settings = {
    admin: {
      showArchivedUsers: this.checked
    }
  };
  dataServices.updateSettings(settings, function (err) {
    if (!err) {
      if (isChecked) {
        document.getElementById('archived-users').classList.add('show');
        document.getElementById('archived-users').classList.remove('hidden');
      } else {
        document.getElementById('archived-users').classList.add('hidden');
        document.getElementById('archived-users').classList.remove('show');
      }
    }
  });
};

document.addEventListener('click', function () {
  var eventTarget = event.target;
  console.log(event.target);
  if (eventTarget.matches('.new-color-label')) {
    // new-color-content is the dropdown which shows the available colors when
    // the user is creating a new user. It's hidden by default but will 
    // show when the user clicks the color swatch. 
    document.getElementById('new-color-content').classList.toggle('show');
  } else if (eventTarget.matches('.new-color-option')) {
    common.updateColorSwatch(eventTarget, {
      'editColor': false, 'newColor': true
    });
  } else if (eventTarget.matches('.edit-color-label')) {
    // edit-color-label is the dropdown which shows the available colors when
    // the user is editing a user. It's hidden by default but will
    // show when the user clicks on the color swatch.
    document.getElementById('edit-color-content' + eventTarget.dataset.id)
      .classList.toggle('show');
  } else if (eventTarget.matches('.edit-color-option') ||
    eventTarget.matches('.edit-color-swatch') || 
    eventTarget.matches('.edit-color-swatch-name')) {
    common.updateColorSwatch(eventTarget, {
      'editColor': true, 'newColor': false
    });
  } else if (eventTarget.matches('.edit-user-link')) {
    // When the user clicks on the edit link, show the new user portion of
    // the view, pre-populated with the current info, ready for editing
    activateUserEditMode(eventTarget.dataset.id, function () {

    });
  } else if (eventTarget.matches('.save-edited-user-button')) {
    // Save the edited user to the db.
    saveEditedUser(eventTarget.dataset.id);
  } else if (eventTarget.matches('.cancel-edited-user-button')) {
    // Reset the new user portion of the view.
    cancelUserEditMode(eventTarget.dataset.id, function () {
    });
  } else if (eventTarget.matches('.archive-user-link')) {
    // When the user clicks on the archiveUser link, call archiveUser
    // from dataServices
    dataServices.archiveUser(eventTarget.dataset.id, function (err) {
      if (!err) {
        location.reload(true);
      }
    });
  } else if (eventTarget.matches('.un-archive-user-link')) {
    // When the user clicks on the unArchive user linke, call unarchiveUser
    // from dataServices
    dataServices.unArchiveUser(eventTarget.dataset.id, function (err) {
      if (!err) {
        location.reload(true);
      }
    });
  }
});

var cancelNewUserMode = function () {
  var newUserRow = document.getElementById('new-user-row');
  var newUserButton = document.getElementById('new-user-button');
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // Show/hide the widgets 
  newUserButton.classList.add('show');
  newUserButton.classList.remove('hidden');
  newUserRow.classList.add('hidden');
  newUserRow.classList.remove('show');

  // show the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('hidden');
  });
};

var activateNewUserMode = function () {
  var newColorContent = document.getElementById('new-color-content');
  var newColorLabel = document.getElementById('new-color-label');
  var newColorName = document.getElementById('new-color-name');
  var selectedColorId = document.getElementById('selected-color-id');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var newUserRow = document.getElementById('new-user-row');
  var newUserButton = document.getElementById('new-user-button');
  // The edit and archive links on the right, which should be hidden
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // Show/hide the widgets to prepare for new category entry
  newUserButton.classList.add('hidden');
  newUserButton.classList.remove('show');
  newUserRow.classList.toggle('show');

  // Hide the edit and archive links so the user can't add an edit a 
  // category simultaneiosly
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('show');
  });

  // Clear out the 'choose a color' dropdown so it doesn't keep populating
  while (newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }

  // Populate the color dropdown
  dataServices.getColors(function (err, colors) {
    var options = { 'edit': false, 'new': true };
    if (!err) {
      // Populate the hidden 'selected' inputs with the data from the first
      // color object.
      selectedColorId.value = colors[0].id;
      selectedBgHex.value = colors[0].bgHex;
      selectedFgHex.value = colors[0].fgHex;
      selectedColorName.value = colors[0].name;

      // Initialize the dropdown label with the bgcolor and name 
      newColorLabel.setAttribute('style', 'background-color:' + selectedBgHex.value);
      newColorName.textContent = selectedColorName.value;

      // Populate the color dropdown
      colors.forEach(function (color) {
        common.createColorOption(color, options, function (colorOption) {
          newColorContent.appendChild(colorOption);
        });
      });
    }
  });
};

var saveEditedUser = function (id) {
  var editUserError = document.getElementById('edit-user-error' + id);
  var editUserFirstName = document.getElementById('edit-user-first-name' + id);
  var editUserLastName = document.getElementById('edit-user-last-name' + id);
  var editUserUsername = document.getElementById('edit-user-username' + id);
  var editUserPassword = document.getElementById('edit-user-password' + id);
  var editUserEmail = document.getElementById('edit-user-email' + id);
  var editUserAdmin = document.getElementById('edit-user-admin' + id);
  var editUserUser = document.getElementById('edit-user-user' + id);
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);

  // Since the isAdmin hidden field value is stored as text I need to convert
  // it to a bool before passing to updateUser
  var isAdmin = false;
  var isUser = false;
  var hiddenAdmin = document.getElementById('is-admin' + id);
  var hiddenUser = document.getElementById('is-user' + id);
  if (hiddenAdmin.value === 'true') {
    isAdmin = true;
  }
  if (hiddenUser.value === 'true') {
    isUser = true;
  }

  // Clear the error notification in case something is lingering
  editUserError.textContent = '';

  // Validate the input
  if (!editUserFirstName.value) {
    editUserError.textContent = 'You have to type a first name';
    return;
  } else if (!editUserLastName.value) {
    editUserError.textContent = 'You have to type a last name';
    return;
  } else if (!editUserUsername.value) {
    editUserError.textContent = 'You have to type a username';
    return;
  } else if (!editUserEmail.value) {
    editUserError.textContent = 'You have to type an email';
    return;
  }

  // If the admin box is checked, the edited user will be in the admin role
  // if the User box is checked the user will be in the user role
  var roles = [];
  if (editUserAdmin.checked) {
    roles.push('Admin');
  }
  if (editUserUser.checked) {
    roles.push('User');
  }

  var options = {
    user: {
      'id': id,
      'firstName': editUserFirstName.value,
      'lastName': editUserLastName.value,
      'bgHex': selectedBgHex.value,
      'fgHex': selectedFgHex.value,
      'colorName': selectedColorName.value,
    },
    'roles': roles,
    'currentlyAdmin': isAdmin || false,
    'currentlyUser': isUser || false
  };
  dataServices.updateUser(options, function (err) {
    if (err) {
      editUserError.textContent = err;
    } else {
      location.reload(true);
    }
  });
};

var saveNewUser = function () {
  var newUserFirstName = document.getElementById('new-user-first-name');
  var newUserLastName = document.getElementById('new-user-last-name');
  var newUserUsername = document.getElementById('new-user-username');
  var newUserPassword = document.getElementById('new-user-password');
  var newUserEmail = document.getElementById('new-user-email');
  var newUserAdmin = document.getElementById('new-user-admin');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var newUserError = document.getElementById('new-user-error');

  // Validate the input
  if (!newUserFirstName.value) {
    newUserError.textContent = 'You have to type a first name';
    return;
  } else if (!newUserLastName.value) {
    newUserError.textContent = 'You have to type a last name';
  } else if (!newUserUsername.value) {
    newUserError.textContent = 'You have to type a username';
  } else if (!newUserPassword.value) {
    newUserError.textContent = 'You have to type a password';
  } else if (!newUserEmail.value) {
    newUserError.textContent = 'You have to type an email address';
  }

  // Post the new user to the database
  var user = {
    'firstName': newUserFirstName.value,
    'lastName': newUserLastName.value,
    'email': newUserEmail.value,
    'username': newUserUsername.value,
    'password': newUserPassword.value,
    'admin': newUserAdmin.checked,
    'fgHex': selectedFgHex.value,
    'bgHex': selectedBgHex.value,
    'colorName': selectedColorName.value
  };
  dataServices.postUser(user, function (err, savedUser) {
    if (!err) {
      console.log('The user was saved: ' + savedUser);
      // reload the page
      // TODO: should be able to refresh without reload
      location.reload(true);
    } else {
      // TODO: notify user if there's an error and do something
    }
  });
};

var activateUserEditMode = function (id, callback) {
  // Prepare the page for editing the user. Hide the non-relevant widgets
  // and show the edit fields, pre-populated with the correct user info.
  //
  // These are the 'edit' widgets which should be shown
  var editUserFirstName = document.getElementById('edit-user-first-name' + id);
  var editUserLastName = document.getElementById('edit-user-last-name' + id);
  var editUserUsername = document.getElementById('edit-user-username' + id);
  var editUserEmail = document.getElementById('edit-user-email' + id);
  var editColorLabel = document.getElementById('edit-color-label' + id);
  var editColorName = document.getElementById('edit-color-name' + id);
  var editColorContent = document.getElementById('edit-color-content' + id);

  // These hidden widgets store the current state of the various user fields.
  var currentFirstName = document.getElementById('current-first-name' + id);
  var currentLastName = document.getElementById('current-last-name' + id);
  var currentEmail = document.getElementById('current-email' + id);
  var currentUsername = document.getElementById('current-username' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var newUserButton = document.getElementById('new-user-button');

  // The edit and archive links on the right, which should be hidden
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // This is the entire gridRow. 
  var editGridRow = document.getElementById('edit-grid-row' + id);
  var currentGridRow = document.getElementById('current-grid-row' + id);

  // The color swatch that the user will click on to choose a color
  editColorLabel.setAttribute('style', 'background-color:' + currentBgHex.value);
  editColorName.textContent = currentColorName.value;

  // Clear out the color dropdown so it doesn't duplicate the list
  while (editColorContent.firstChild) {
    editColorContent.removeChild(editColorContent.firstChild);
  }

  // Hit the database to get all the colors and use them to populate the 
  // color dropdown
  dataServices.getColors(function (err, colors) {
    var categoryId = id;
    var options = { 'edit': true, 'new': false };
    if (!err) {
      colors.forEach(function (color) {
        common.createColorOption(color, options, function (colorOption) {
          colorOption.setAttribute('data-categoryid', categoryId);
          editColorContent.appendChild(colorOption);
        });
      });
    }
  });

  // Stuff to show that's currently hidden.
  editGridRow.classList.add('show');
  editGridRow.classList.remove('hidden');

  // Stuff to hide that's currently shown
  currentGridRow.classList.add('hidden');
  currentGridRow.classList.remove('show');
  newUserButton.classList.add('hidden');
  newUserButton.classList.remove('show');
  newUserButton.classList.remove('showInline');

  // hide the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('show');
  });

  // Populate the input widgets with the current user data
  editUserFirstName.value = currentFirstName.value;
  editUserLastName.value = currentLastName.value;
  editUserUsername.value = currentUsername.value;
  editUserEmail.value = currentEmail.value;

  if (callback) {
    return callback();
  }
};

var cancelUserEditMode = function (id, callback) {
  // Restore the user back to view mode, hiding the edit fields
  // Arguments:
  //  id: the id of the user to reset
  //  callback: Optional. The callback is returned without arguments
  //
  var newUserButton = document.getElementById('new-user-button');

  // The edit and archive links on the right, which should be shown 
  var editUserLinks = document.getElementsByClassName('edit-user-link');
  var archiveUserLinks = document.getElementsByClassName('archive-user-link');

  // This is the entire gridRow. 
  var editGridRow = document.getElementById('edit-grid-row' + id);
  var currentGridRow = document.getElementById('current-grid-row' + id);

  // Stuff to hide that's currently shown.
  editGridRow.classList.add('hidden');
  editGridRow.classList.remove('show');

  // Stuff to show that's currently hidden
  currentGridRow.classList.add('show');
  newUserButton.classList.add('show');
  newUserButton.classList.remove('hidden');

  // show the edit and archive links 
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editUserLinks, function (link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveUserLinks, function (link) {
    link.classList.remove('hidden');
  });

  if (callback) {
    return callback();
  }
};


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

//COMMON.JS
//This is the common functions that will be used by 2 or more other scripts.
const hashtable = __webpack_require__(3), 
  dataServices = __webpack_require__(1);


// create a new color option and return it in a callback
// a color option is a color name along with a color swatch
// Arguments are mandatory and  are;
// color: a color object based on the mongoose color model
// options: json list of options. values are:
//  newCategory : true/false
//  editCategory : true/false
// callback: The new colorOption is passed to the callback
exports.createColorOption = function(color, options , callback) {
  var colorOption = document.createElement('div');
  var swatch = document.createElement('label');
  var colorName = document.createElement('label');

  colorOption.setAttribute('data-colorid', color.id);
  colorOption.setAttribute('data-color', color.name);
  colorOption.setAttribute('data-bghex', color.bgHex);
  colorOption.setAttribute('data-fghex', color.fgHex);
  swatch.setAttribute('data-colorid', color.id);
  swatch.setAttribute('data-color', color.name);
  swatch.setAttribute('data-bghex', color.bgHex);
  swatch.setAttribute('data-fghex', color.fgHex);
  swatch.setAttribute('style', 'background-color:' + color.bgHex);
  colorName.setAttribute('data-colorid', color.id);
  colorName.setAttribute('data-color', color.name);
  colorName.setAttribute('data-bghex', color.bgHex);
  colorName.setAttribute('data-fghex', color.fgHex);
  colorName.textContent = ' ' + color.name + ' ';
  colorOption.appendChild(swatch);
  colorOption.appendChild(colorName);
  
  if(options.new) {
    colorOption.setAttribute('class', 'new-color-option');
    swatch.setAttribute('class', 'swatch new-color-swatch');
    colorName.setAttribute('class', 'new-color-swatch-name');
  } else if(options.edit) {
    colorOption.setAttribute('class', 'edit-color-option');
    swatch.setAttribute('class', 'swatch edit-color-swatch');
    colorName.setAttribute('class', 'edit-color-swatch-name');
  } 

  return callback(colorOption);
};

exports.updateColorSwatch = function(target, options) {
  // This function should be called when the user clicks on a color in the
  // editColorDropdown or newColorDropdown. 
  // It will Update the swatch and the text of the selected color to 
  // reflect which colorOption the user clicked on 
  // Parameters:
  // target: the target that the user clicked on 
  // options: json obect with the following. Both are required
  //  edit: true/false
  //  new: true/false
  var selectedColorId = '';
  var selectedBgHex = '';
  var selectedFgHex = '';
  var selectedColorName = '';

  if (options.editColor) {
    // Edit Color Mode
    var editColorLabel = document.getElementById('edit-color-label' + 
      target.dataset.categoryid);
    var editColorContent = document.getElementById('edit-color-content' + 
      target.dataset.categoryid);
    var editColorName = document.getElementById('edit-color-name' + 
      target.dataset.categoryid);
    selectedColorId = document.getElementById('selected-color-id' + 
      target.dataset.categoryid);
    selectedBgHex = document.getElementById('selected-bg-hex' + 
      target.dataset.categoryid);
    selectedFgHex = document.getElementById('selected-fg-hex' +
      target.dataset.categoryid);
    selectedColorName = document.getElementById('selected-color-name' + 
      target.dataset.categoryid);

    editColorLabel.setAttribute('style', 'background-color: ' + 
       target.dataset.bghex);
    editColorName.textContent = target.dataset.color;
    // Hide the dropdown since the user has selected a color
    editColorContent.classList.remove('show');
    editColorContent.classList.add('hidden');
  } else if (options.newColor) {
    // New Color Mode
    var newColorLabel = document.getElementById('new-color-label');
    var newColorContent = document.getElementById('new-color-content');
    var newColorName = document.getElementById('new-color-name');
    selectedColorId = document.getElementById('selected-color-id');
    selectedBgHex = document.getElementById('selected-bg-hex');
    selectedFgHex = document.getElementById('selected-fg-hex');
    selectedColorName = document.getElementById('selected-color-name');

    newColorLabel.setAttribute('style', 'background-color: ' + 
       target.dataset.bghex);
    newColorName.textContent = target.dataset.color;
    // Hide the dropdown since the user has selected a color
    newColorContent.classList.remove('show');
    newColorContent.classList.add('hidden');
  }
  // Update the hidden 'selected' inputs that hold colorId and bgHex. 
  // These will be used to update the 'current' hidden fields when 
  // the save button is clicked and everything is saved to the db
  selectedColorId.value = target.dataset.colorid;
  selectedBgHex.value = target.dataset.bghex;
  selectedFgHex.value = target.dataset.fghex;
  selectedColorName.value =  target.dataset.color;
};

function getCurrentlyLoggedInUser(callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState === 4 && this.status === 200) {
      if (JSON.parse(this.responseText).error) {
        return callback(JSON.parse(this.responseText).error, null);
      } else {
        return callback(null, JSON.parse(this.responseText).user);
      }
    }
  };
  const url = '/api/user/current/get';
  xhttp.open('GET', url , true);
  xhttp.send();

}

exports.populateUsersDropdown = function() {
  const dataServices = __webpack_require__(1), 
    usersDropdownList = document.getElementById('users-list');
  
    getCurrentlyLoggedInUser( (err, currentlyLoggedInUser) => {
      if(!err && currentlyLoggedInUser) {
        dataServices.getAllUsers( (err, users) => {
          if(!err) {
            // populate the users dropdown list. 
            users.forEach( (user) => {
              // Don't populate the current user in the list
              if(user.id !== currentlyLoggedInUser.id) {
                const userFullName = user.firstName + ' ' + user.lastName;

                let usersListItem = document.createElement('li'), 
                  usersListItemLink = document.createElement('a');

                usersListItemLink.setAttribute('class', 'nav-link users-list-item');
                usersListItemLink.setAttribute('data-id', user.id);
                usersListItemLink.setAttribute('id', 'users-list-item-link' + user.id);
                usersListItemLink.textContent = userFullName;

                usersListItem.appendChild(usersListItemLink);
                usersDropdownList.appendChild(usersListItem);
              }
            });
          }
        });
      }
    });
};

// This function will change the currently active user by updating req.session.user
// with the userID that's passed in. 
exports.changeCurrentUser = function(userId, callback) {
  const usersHash = new hashtable;
  let updatedUser = {};

  dataServices.getAllUsers( (err, users) => {
    if(err) {
      return callback('err');
    } else {
      users.forEach( (user) => {
        usersHash.put(user.id, user);
      });
      updatedUser = usersHash.get(userId);
      
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
          if(JSON.parse(this.responseText).error) {
            return callback(JSON.parse(this.responseText).error);
          } else {
            return callback('');
          }
        }
      };
      var url = '/api/user/current/change';
      xhttp.open('POST', url, true);
      xhttp.setRequestHeader('Content-type', 'application/json');
      xhttp.send(JSON.stringify({ 'user': updatedUser}));
    }
  });
}


/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

module.exports = function HashTable() {
  const LinkedList = __webpack_require__(4);

  let table = [], 
  length = 0,
  linkedList = new LinkedList();

  let hash = function(key) {
    let hash = '';

    for(let i = 0, max = key.length; i < max; i += 1) {
      hash += key.charCodeAt(i);
    }
    return hash % 31;
  };

  let ValuePair = function(key, value) {
    this.key = key;
    this.value = value;
  };

  this.put = function(key, value) {
    const hashedKey = hash(key),
    valuePair = new ValuePair(key, value);

    if(table[hashedKey] === undefined) {
      let linkedList = new LinkedList(); 
        linkedList.addLast(valuePair);
        table[hashedKey] = linkedList;
    } else {
      table[hashedKey].addLast(valuePair);
    }
    length += 1;
    return true;
  };

  this.get = function(key) {
    const hashedKey = hash(key);

    if(table[hashedKey] !== undefined) {
      let current = table[hashedKey].getHead();
      while(current) {
        if(current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
      return undefined;
    }
  };

  this.size = function() {
    return length;
  };
};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = function LinkedList() {
  let length = 0, 
  head = null, 
  Node = function(element) {
    this.element = element;
    this.next = null;
  };

  this.addFirst = function(element) {
    let node = new Node(element);

    if(!head) {
      head = node;
      length += 1;
    } else {
      node.next = head;
      head = node;
      length += 1;
    }
  };

  this.addLast = function(element) {
    let current = head, 
    node = new Node(element);

    // if head is null, new node becomes head. 
    if(!head) {
      head = node;
      length += 1;
    } else {
      while(current.next) {
        current = current.next;
      }
      current.next = node;
      length += length;
    }
  };

  this.addBefore = function(newElement, existingElement) {
    let current = head, 
    previous = null,
    node = new Node(newElement);

    if(head.element === existingElement) { // Head is element ot insert
      node.next = head;
      head = node;
      length += 1;
      return true;
    } else { // Element to add before is other than head. 
      while(current) {
        if(current.element === existingElement) { // Match, add before here.
          previous.next = node;
          node.next = current;
          length += 1;
          return true;
        }
        previous = current;
        current = current.next;
      }
      return false; // Element to add before doesn't exist. 
    }
  };

  this.addAfter = function(newElement, existingElement) {
    let node = new Node(newElement),
    current = head;

    while(current) {
      if(current.element === existingElement) { // adding here
        node.next = current.next;
        current.next = node;
        length += 1;
        return true;
      }
      current = current.next; 
    }
    return false; // the exstingElement doesn't exist.
  };

  this.find = function(element) {
    let current = head;

    if(length === 0) { // empty list
      return null;
    } else {
      while(current) {
        if(current.element === element) { // element found
          return current.element;
        }
        current = current.next;
      }
    }
    return null; // element not found;
  };

  this.toString = function() {
    let returnString = '', 
    current = head;

    while(current) {
      if(current.next) { // not last node
        returnString += current.element + ',';
      } else {
        returnString += current.element;
      }
      current = current.next;
    }
    return returnString;
  };

  this.getHead = function() {
    return head;
  };

  this.size = function() {
    return length;
  };

};

/***/ })

/******/ });