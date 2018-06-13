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
/******/ 	return __webpack_require__(__webpack_require__.s = 134);
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

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

const common = __webpack_require__(2);

window.onload = function() {
  common.populateUsersDropdown();
  //highlight the page in the navbar
  document.getElementById('add-task-link').classList.toggle('active-page-link');
};

// Show the owner dropdown when the user clicks on 'choose owner' dropdown
document.getElementById('owner-drop-btn').onclick = function() {
  document.getElementById('owner-dropdown-content').classList.toggle('show');
};

// Show the owner dropdown when the user clicks on 'choose owner' input
document.getElementById('owner').onclick = function() {
  document.getElementById('owner-dropdown-content').classList.toggle('show');
};

// Show the category dropdown when the user clicks on 'choose color' dropdown
document.getElementById('category-drop-btn').onclick = function() {
  document.getElementById('category-dropdown-content').classList.toggle('show');
};

// Show the category dropdown when the user clicks on 'choose color' input
document.getElementById('category').onclick = function() {
  document.getElementById('category-dropdown-content').classList.toggle('show');
};

var processCategoryClick = function(target) {
  // assign the id' to the hidden input for later saving to the db
  // and the category name to the input
  document.getElementById('category-id').value = target.dataset.id;
  document.getElementById('category').value = target.dataset.category;
};

var processOwnerClick = function(target) {
  // assign the ownerId to the hidden input for later saving to the db
  // and the owner name to the input
  document.getElementById('owner-id').value = target.dataset.id;
  document.getElementById('owner').value = target.dataset.owner;
};

var processCreatedByClick = function(target) {
  document.getElementById('created-by-id').value = target.dataset.id;
  document.getElementById('created-by').value = target.dataset.createdby;
};

document.getElementById('recurring-check').onclick = function() {
  var check = document.getElementById('recurring-check');
  var frequencyInput = document.getElementById('frequency'); 
  var frequencySelect = document.getElementById('frequency-cadence'); 

  // disable and clear the value of the frequency area
  if (check.checked) {
    frequencyInput.disabled = false;
    frequencySelect.disabled = false;
  } else {
    frequencyInput.disabled = true;
    frequencySelect.disabled = true;
    frequencyInput.value = null;
    frequencySelect.value = null;
  }
};

// Process clicks on the various dropdowns on the form
document.addEventListener('click', function() {
  if (event.target.matches('.category-option') || event.target.matches('.swatch')) {
    processCategoryClick(event.target);
  } else if (event.target.matches('.owner-option')) {
    processOwnerClick(event.target);
  } else if (event.target.matches('.created-by-option')) {
    processCreatedByClick(event.target);
  } 
});

// If the user clicks outside of any of the dropdowns then close the list
// TODO: change this to a functional style this is from w3 schools 
//  and it's TERRIBLE
window.onclick = function(event) {
  console.log(event.target);
  if (!event.target.matches('.drop-btn') && !event.target.matches('.drop-arrow')
        && !event.target.matches('.dropdown-input')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
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