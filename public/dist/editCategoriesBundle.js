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
/******/ 	return __webpack_require__(__webpack_require__.s = 130);
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

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

let dataServices = __webpack_require__(1),
  common = __webpack_require__(2);

var activateNewCategoryMode = function() {
  var newCategoryRow = document.getElementById('new-category-row');
  var newColorContent = document.getElementById('new-color-content');
  var newColorLabel = document.getElementById('new-color-label');
  var newColorName = document.getElementById('new-color-name');
  var newCategoryButton = document.getElementById('new-category-button');
  var selectedColorId = document.getElementById('selected-color-id');
  var selectedBgHex = document.getElementById('selected-bg-hex');
  var selectedFgHex = document.getElementById('selected-fg-hex');
  var selectedColorName = document.getElementById('selected-color-name');
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');

  // Clear out the 'choose a color' dropdown so it doesn't keep populating
  while(newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }
  // show/hide the widgets to prepare for new category entry
  newCategoryButton.classList.add('hidden');
  newCategoryButton.classList.remove('show');
  newCategoryRow.classList.add('show');   
  newCategoryRow.classList.remove('hidden');

  // Hide the edit and archive links so the user can't add and edit a 
  // category simultaneously
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('show');
  });
 
  // Clear out the 'choose a color' dropdown so it doesn't continuously
  // populate in a loop each time there's an update. 
  while(newColorContent.firstChild) {
    newColorContent.removeChild(newColorContent.firstChild);
  }

  // Populate the color dropdown
  dataServices.getColors(function(err, colors) {
    var options = { 'edit' : false, 'new' : true };
    if(!err) {
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
      colors.forEach(function(color) {
        common.createColorOption(color, options , function(colorOption) {
          newColorContent.appendChild(colorOption);
        });
      });
    }
  });
};

var activateCategoryEditMode = function(id, callback) {
  // Hide the edit links on the right, hide the category label, and show
  // th category edit fields on the left
  // Also populate the form widgets with the correct colors and text
  // based on the 'current' hidden fields 
  var editColorContent = document.getElementById('edit-color-content' + id);
  var editCategoryInput = document.getElementById('edit-category-input' + id);
  var saveCategoryEdit = document.getElementById('save-category-edit' + id);
  var cancelCategoryEdit = document.getElementById('cancel-category-edit' + id);
  var editCategoryLink = document.getElementById('edit-category-link' + id);
  var archiveCategoryLink = document.getElementById('archive-category-link' + id);
  var categoryLabel = document.getElementById('category-label' + id); 
  var editColorDropdown = document.getElementById('edit-color-dropdown' + id);
  var newCategoryButton = document.getElementById('new-category-button');
  var editColorLabel = document.getElementById('edit-color-label' + id);
  var editColorName = document.getElementById('edit-color-name' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');
 
  // The color swatch that the user will click on to choose a color
  editColorLabel.setAttribute('style', 'background-color:' + currentBgHex.value);
  editColorName.textContent =  currentColorName.value;

  // Clear out the color dropdown so it doesn't duplicate the list
  while(editColorContent.firstChild) {
    editColorContent.removeChild(editColorContent.firstChild);
  }

  // Hit the database to get all the colors and use them to populate the 
  // color dropdown
  dataServices.getColors(function(err, colors) {
    var categoryId = id;
    var options = { 'edit' : true, 'new' : false };
    if(!err) {
      colors.forEach(function(color) {
        common.createColorOption(color, options, function(colorOption) {
          colorOption.setAttribute('data-categoryid', categoryId);
          for(let i = 0, max = colorOption.children.length; i < max; i += 1) {
            colorOption.children[i].setAttribute('data-categoryid', categoryId);
          }
          editColorContent.appendChild(colorOption);
        });
      });
    }
  });

  saveCategoryEdit.classList.add('show-inline');
  cancelCategoryEdit.classList.add('show-inline');
  categoryLabel.classList.add('hidden');
  editCategoryInput.classList.add('show-inline');
  editCategoryInput.value = categoryLabel.textContent;
  editCategoryLink.classList.add('hidden');
  editCategoryLink.classList.remove('show-inline');
  archiveCategoryLink.classList.add('hidden');
  archiveCategoryLink.classList.remove('show-inline');
  editColorDropdown.classList.remove('hidden');
  editColorDropdown.classList.add('show-inline');
  newCategoryButton.classList.add('hidden');
  newCategoryButton.classList.remove('show');
  
  // Hide the edit and archive links so the user can't add and edit a 
  // category simultaneously
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('show');
  });

  if(callback) {
    return callback();
  }
};

var cancelCategoryEditMode = function(id, callback) {
  // Restore the edit link, archive link, and category label
  // Hide the input
  // Reset the hidden inputs which hold the selected color and other
  // attributes.
  // Arguments: 
  //  id: The id of the category to reset
  //  callback: Optional. The callback is returned without arguments
  var editCategoryInput = document.getElementById('edit-category-input' + id);
  var saveCategoryEdit = document.getElementById('save-category-edit' + id);
  var cancelCategoryEdit = document.getElementById('cancel-category-edit' + id);
  var editCategoryLink = document.getElementById('edit-category-link' + id);
  var archiveCategoryLink = document.getElementById('archive-category-link' + id);
  var categoryLabel = document.getElementById('category-label' + id); 
  var editColorDropdown = document.getElementById('edit-color-dropdown' + id);
  var editColorContent = document.getElementById('edit-color-content' + id);
  var newCategoryButton = document.getElementById('new-category-button');
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);
  var selectedCategoryName = document.getElementById('selected-category-name' + id);
  var currentColorId = document.getElementById('current-color-id' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentFgHex = document.getElementById('current-fg-hex' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var currentCategoryName = document.getElementById('current-category-name' + id);
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link'); 

  // Show and hide the appropriate widgets
  editCategoryInput.classList.add('hidden');
  editCategoryInput.classList.remove('show-inline');
  saveCategoryEdit.classList.add('hidden');
  saveCategoryEdit.classList.remove('show-inline');
  cancelCategoryEdit.classList.add('hidden');
  cancelCategoryEdit.classList.remove('show-inline');
  editCategoryLink.classList.add('show-inline');
  editCategoryLink.classList.remove('hidden');
  archiveCategoryLink.classList.add('show-inline');
  archiveCategoryLink.classList.remove('hidden');
  editColorDropdown.classList.remove('show-inline');
  editColorDropdown.classList.add('hidden');
  editColorContent.classList.remove('show');
  categoryLabel.classList.remove('hidden');
  newCategoryButton.classList.add('show');
  newCategoryButton.classList.remove('hidden');
  
  // show the edit and archive links 
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  
  // Reset the hidden 'selected' inputs to reflect the current state
  // of the database, which is stored in the hidden 'current' inputs.
  selectedColorId.value = currentColorId.value;
  selectedBgHex.value = currentBgHex.value;
  selectedFgHex.value = currentFgHex.value;
  selectedColorName.value = currentColorName.value;
  selectedCategoryName.value = currentCategoryName.value;

  // Update the category label colors and text
  categoryLabel.setAttribute('style', 'background-color:' +
    currentBgHex.value + ';' + 'color:' + currentFgHex.value);
  categoryLabel.textContent = currentCategoryName.value;

  // Hide the error message for input validation
  document.getElementById('edit-category-error').textContent = '';

  if(callback) {
    return callback();
  }
};

var saveEditedCategory = function(id) {
  var selectedColorId = document.getElementById('selected-color-id' + id);
  var selectedBgHex = document.getElementById('selected-bg-hex' + id);
  var selectedFgHex = document.getElementById('selected-fg-hex' + id);
  var selectedColorName = document.getElementById('selected-color-name' + id);
  var selectedCategoryName = document.getElementById('selected-category-name' + id);
  var currentColorId = document.getElementById('current-color-id' + id);
  var currentBgHex = document.getElementById('current-bg-hex' + id);
  var currentFgHex = document.getElementById('current-fg-hex' + id);
  var currentCategoryName = document.getElementById('current-category-name' + id);
  var currentColorName = document.getElementById('current-color-name' + id);
  var editCategoryInput = document.getElementById('edit-category-input' + id);

  //Validate the user input
  if(!editCategoryInput.value) {
    document.getElementById('edit-category-error').textContent = 
      'You have to give the category a name';
    return;
  } else {
    // If there's text in the error field remove it
  document.getElementById('edit-category-error').textContent = '';
  }

  var doc = {
    category : {
      'id' : id,
      'name' : editCategoryInput.value,
      '_color' : document.getElementById('selected-color-id' + id).value
    }
  };
  dataServices.updateCategory(doc, function(err, updatedCategory) {
    if(err) {
      console.log(err);
    } else {
      // Update the hidden 'current' inputs to reflect the new color data
      currentColorId.value = selectedColorId.value;
      currentBgHex.value = selectedBgHex.value;
      currentFgHex.value = selectedFgHex.value;
      currentColorName.value = selectedColorName.value;
      selectedCategoryName.value = editCategoryInput.value;
      currentCategoryName.value = editCategoryInput.value;

      cancelCategoryEditMode(id);
    }
  });
};

var saveNewCategory = function() {
  var newCategoryInput = document.getElementById('new-category-input');
  var selectedColorId = document.getElementById('selected-color-id');

  // Validate the input
  if(!newCategoryInput.value) {
    document.getElementById('new-category-error').textContent = 
      'You have to give the category a name';
    return;
  }

  // Post the new category to the database
  var category = { 'name' : newCategoryInput.value, 
    '_color' :  selectedColorId.value };
  dataServices.postCategory(category, function(err) {
    if(!err) {
      cancelNewCategoryMode();
      location.reload(true);
      // TODO: notify user if there's an error and refresh the page
      // or leave as-is. not sure which one yet. 
    }
  });
};

window.onload = function() {
  common.populateUsersDropdown();
  //highlight the page in the navbar
  document.getElementById('edit-categories-link').classList.toggle('active-page-link');
};

// When the user clicks the 'showArchived' checkbox, save the changes to the
// database and refresh the page. 
document.getElementById('show-archived-check').onclick = function() {
  var isChecked = this.checked;
  var settings = {
    categories : {
      showArchivedTasks : this.checked
    }
  };
  dataServices.updateSettings(settings, function(err, settings) {
    if(!err) {
      if(isChecked) {
        document.getElementById('archived-categories').classList.add('show');
        document.getElementById('archived-categories').classList.remove('hidden');
      } else {
        document.getElementById('archived-categories').classList.add('hidden');
        document.getElementById('archived-categories').classList.remove('show');
      }
    }
  });
};

// when the user clicks on the NewCategory button, show the add
// category portion of the view and populate with data for selection
document.getElementById('new-category-button').onclick = function() {
  activateNewCategoryMode();
};

// When the user clicks on the Cancel button in the newCategory section, 
// hide the newCategory section and show the normal user view mode.
document.getElementById('cancel-create-category-button').onclick = function() {
  cancelNewCategoryMode();
};
// When the user clicks on the create-category-button, save the new category
// to the database and reset the page, hiding the newCategory section
document.getElementById('create-category-button').onclick = function() {
  saveNewCategory(); 
};


// If the user clicks outside of dropBtn then close the list
//  This also needs to be re-worked to accomodate the new color dropdowns
window.onclick = function(event) {
  if (!event.target.matches('.new-color-label') && 
    !event.target.matches('.edit-color-label')) {
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

var cancelNewCategoryMode = function() {
  var editCategoryLinks = document.getElementsByClassName('edit-category-link');
  var archiveCategoryLinks = document.getElementsByClassName('archive-category-link');
  var newCategoryButton = document.getElementById('new-category-button');
  var newCategoryRow = document.getElementById('new-category-row');
  var newCategoryInput = document.getElementById('new-category-input');
  var newColorContent = document.getElementById('new-color-content');

  // Show the edit and archive links 
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(editCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.add('show');
  });
  Array.prototype.forEach.call(archiveCategoryLinks, function(link) {
    link.classList.remove('hidden');
  });

  // show/hide the widgets to prepare for new category entry
  newCategoryButton.classList.add('show');
  newCategoryButton.classList.remove('hidden');
  newCategoryRow.classList.add('hidden');   
  newCategoryRow.classList.remove('show');
  newColorContent.classList.remove('show');

  // Clear out the newCateogryInput so it's empty next time around
  newCategoryInput.value = '';

};

document.addEventListener('touchend', function() {
  var eventTarget = event.target;

    // editColorContent is the dropdown which shows the available colors when
    // the user is editing a category. It's hidden by default but will show
    // when the user clicks on the color swatch during editing
    document.getElementById('edit-color-content' + eventTarget.dataset.categoryid)
      .classList.toggle('show');
  if (eventTarget.matches('.new-color-label') || 
      eventTarget.matches('.new-category-dropdown') ||
      eventTarget.matches('.new-color-name') ||
      eventTarget.matches('.new-color-dropdown-caret')
  ) {
    // newColorContent is the dropdown which shows the available colors when
    // the user is creating a new category. It's hidden by default but will 
    // show when the user clicks the color swatch. 
    document.getElementById('new-color-content').classList.toggle('show');
  } else if (eventTarget.matches('.edit-color-label') ||
      eventTarget.matches('.edit-color-dropdown') ||
      eventTarget.matches('.edit-color-name') ||
      eventTarget.matches('.edit-color-dropdown-caret')
  ) {
    // editColorContent is the dropdown which shows the available colors when
    // the user is editing a category. It's hidden by default but will show
    // when the user clicks on the color swatch during editing
    document.getElementById('edit-color-content' + eventTarget.dataset.categoryid)
      .classList.toggle('show');
    } else if (eventTarget.matches('.edit-color-option') || 
    eventTarget.matches('.edit-color-swatch') ||
    eventTarget.matches('.edit-color-swatch-name')
  ) {
    // editColorOption is an item in the list of colors which shows when
    // the user clicks on the color swatch.
    // When the user clicks on this, the color swatch background
    // and name should change
    // The data attributes should also change to reflect the new color
    common.updateColorSwatch(eventTarget, { 'editColor' : true, 'newColor' : false});
  }
});

document.addEventListener('click', function() {
  var selectedColorIdInput = document.getElementById('selected-color-id');
  var eventTarget = event.target;
  
  if (eventTarget.matches('.archive-category-link')) {
    // When the user clicks on the archive link, call archiveCategory from 
    // data-services. 
    dataServices.archiveCategory(eventTarget.dataset.id, function(err) {
      if(!err) {
        location.reload(true);
      }
    });
  } else if(eventTarget.matches('.unarchive-category-link')) {
    // When the user clicks on the unarchive link, call unArchiveCategory from
    // data-services.
    dataServices.unArchiveCategory(eventTarget.dataset.id, function(err) {
      if(!err) {
        location.reload(true);
      }
    });
  } else if (eventTarget.matches('.new-color-option') ||
      eventTarget.matches('.new-color-swatch') ||
      eventTarget.matches('.new-color-swatch-name')
  ) {
    common.updateColorSwatch(eventTarget, { 'editColor' : false, 'newColor' : true});
  } else if (eventTarget.matches('.edit-category-link')) {
    // When the user clicks on the edit link, show the new category portion of
    // the view, pre-populated with the the category info and ready for editing
    activateCategoryEditMode(eventTarget.dataset.id, function() {
    });
  } else if (eventTarget.matches('.edit-color-option') || 
    eventTarget.matches('.edit-color-swatch') ||
    eventTarget.matches('.edit-color-swatch-name')
  ) {
    // editColorOption is an item in the list of colors which shows when
    // the user clicks on the color swatch.
    // When the user clicks on this, the color swatch background
    // and name should change
    // The data attributes should also change to reflect the new color
    common.updateColorSwatch(eventTarget, { 'editColor' : true, 'newColor' : false});
  } else if (eventTarget.matches('.edit-color-label') ||
      eventTarget.matches('.edit-color-dropdown') ||
      eventTarget.matches('.edit-color-name') ||
      eventTarget.matches('.edit-color-dropdown-caret')
    ) {
    // editColorContent is the dropdown which shows the available colors when
    // the user is editing a category. It's hidden by default but will show
    // when the user clicks on the color swatch during editing
    document.getElementById('edit-color-content' + eventTarget.dataset.categoryid)
      .classList.toggle('show');
  } else if (eventTarget.matches('.new-color-label') || 
      eventTarget.matches('.new-category-dropdown') ||
      eventTarget.matches('.new-color-name') ||
      eventTarget.matches('.new-color-dropdown-caret')
    ) {
    // newColorContent is the dropdown which shows the available colors when
    // the user is creating a new category. It's hidden by default but will 
    // show when the user clicks the color swatch. 
    document.getElementById('new-color-content').classList.toggle('show');
  } else if (eventTarget.matches('.save-category-edit')) {
    // Save the selected color and name to the db
    saveEditedCategory(eventTarget.dataset.id);
  } else if (eventTarget.matches('.cancel-category-edit')) {
    // The user clicked the cancel button, so the category section has
    // to be reset to the state at load or the user's last change
    // The current state is saved in the hidden inputs:
    //    currentColorId
    //    currentBgHex
    //    currentfgHex
    //    currentColorName
    cancelCategoryEditMode(eventTarget.dataset.id); 
  }
});


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