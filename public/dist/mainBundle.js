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
/******/ 	return __webpack_require__(__webpack_require__.s = 124);
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

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_css__);

const common = __webpack_require__(2);

// document.getElementById('nav-user-dropdown').onclick = function() {
//   console.log('nav-user-dropdown');

//   let content = document.getElementById('nav-user-dropdown-content');
//   if(content.classList.contains('hidden')) {
//     content.classList.add('show');
//     content.classList.remove('hidden');
//   }
//   else if(content.classList.contains('show')) {
//     content.classList.add('hidden');
//     content.classList.remove('show');
//   }
// };

document.getElementById('logged-in-user-full-name').onclick = function() {
  let content = document.getElementById('nav-user-dropdown-content');
  if(content.classList.contains('hidden')) {
    content.classList.add('show');
    content.classList.remove('hidden');
  }
  else if(content.classList.contains('show')) {
    content.classList.add('hidden');
    content.classList.remove('show');
  }
};

document.addEventListener('click', () => {
  if(event.target.matches('.users-list-item')) {
    common.changeCurrentUser(event.target.dataset.id, (err) => {
      if(!err) {
        location.reload(true);
      }
    });
  }
});

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(133);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(135)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(134)(false);
// imports


// module
exports.push([module.i, "body {\n  background-color:  #c8c3cc;\n}\n\nh1 {\nmargin-top: 32px;\ntext-align: center;\n}\n\nh3 {\ntext-align: center;\n}\n\n.pull-right {\nfloat: right;\nmargin-right: 0;\n}\n\n.pull-left {\nfloat : left;\nmargin-left: 0;\n}\n\n.error {\ncolor: red;\n}\n\n.tooltip {\n  position: relative;\n  display: inline-block;\n}\n\n.tooltip .tooltip-text {\n  visibility: hidden;\n  background-color: black;\n  color: #fff;\n  text-align: center;\n  padding: 5px 0;\n  border-radius: 6px;\n  width: 120px;\n  margin-left: -60px;\n  top: 150%;\n  left: 50%;\n  position: absolute;\n  z-index: 1;\n}\n\n.tooltip .tooltip-text::after {\n  content: \" \";\n  position: absolute;\n  bottom: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px;\n  border-style: solid;\n  border-color: transparent transparent black transparent;\n}\n\n.tooltip:hover .tooltip-text {\n  visibility: visible;\n}\n\n.nav-link {\n  display: block;\n  text-align: center;\n  padding: 6px 6px;\n  text-decoration: none;\n  /*color: #666;*/\n  color: #ffffff\n}\n\n/* highlight the navs on hover*/\n.nav-link:hover {\n  /*background-color: black;*/\n  background-color: #0000ff;\n  color: #ffffff;\n  cursor: pointer;\n}\n\n.hidden {\n  display: none\n}\n\n.show {\n  display: block;\n}\n\n.show-inline {\n  display:inline-block;\n}\n\n.active-page-link {\n  background-color: #4caf50;\n  color: #ffffff;\n}\n\n/* stop the active page link from\n * changing color on hover\n */\n.active-page-link:hover {\n  background-color: #4caf50;\n  color: #ffffff;\n}\n\n.top-menu {\n  z-index: 1;\n  height: 32px;\n  width: 100%;\n  background-color: #252525;\n  /*background-color: #e0e2e4;*/\n  position: fixed;\n  top: 0;\n  left: 0;\n  border-bottom-style: solid;\n  border-bottom-width: thin;\n  border-bottom-color: gray;\n}\n\n.logo-text-container {\n  height: 32px;\n  display: inline-block;\n  vertical-align: top;\n}\n\n.logo-text {\n  /*color: #666;*/\n  color: #ffffff;\n  margin-top: 6px;\n}\n\n.left-section {\n  height: 32px;\n  display: inline-block;\n  vertical-align: top;\n}\n\n.right-section, .user-section {\n  height: 32px;\n  vertical-align: top;\n  float: right;\n}\n\n.left-section ul, .right-section ul, \n  .user-section ul {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  overflow: hidden;\n  /*background-color: #e0e2e4;*/\n  background-color: #252525;\n}\n\n.left-section li, .right-section li {\n  float: left;\n}\n\n.user-section li {\n  width: 100%;\n}\n\n.user-section ul {\n  padding-left: 0;\n}\n\n.person-menu {\n  top: 32px;\n  left: 0;\n  width: 78px;\n  height: 100%;\n  position: fixed;\n  overflow: auto;\n  /*background-color: #e0e2e4;*/\n  background-color: #252525;\n  /*\n  border-right-style: solid;\n  border-right-width: thin;\n  border-right-color: gray;\n  */\n}\n\n.person-menu ul {\n  margin-top: 5px;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.person-menu li {\n  color: #ffffff;\n  /*color: #666;*/\n  text-decoration: none;\n  list-style-type: none;\n  font-size: 12px;\n  overflow: hidden;\n  text-align: center;\n}\n\n.profile-pic-lg {\n  height: 60px;\n  width: 60px;\n  border-style: solid;\n}\n\n.profile-pic-sm {\n  height: 20px;\n  width: 20px;\n}\n\n.profile-pic-lg:hover {\n  cursor: pointer;\n  border-color: green;\n  color: green;\n}\n\n.filters { \n  z-index: 0;\n  position: fixed;\n  width: 100%;\n  top: 34px;\n  left: 78px;\n  height: 18px;\n  background-color: #e0e2e4;\n  padding-left: 5px;\n}\n\n.content {\n  padding-left: 75px;\n  margin-top: 52px;\n}\n\n.three-column {\n  width: 33.33%;\n}\n\n.four-column {\n  width: 25%;\n}\n\n.five-column {\n  width: 20%;\n}\n\n.three-column, .four-column,\n  .five-column {\n    float: left;\n    vertical-align: top;\n}\n\n.not-started-header {\n  background-color: #252525;\n  /*background-color: #bd4f4f;*/\n}\n\n.in-progress-header {\n  background-color: #252525;\n  /*background-color: #5f85be;*/\n}\n\n.paused-header {\n  background-color: #252525;\n  /*background-color: #9c0202;*/\n}\n\n.completed-header {\n  background-color: #252525;\n  /*background-color: #00c32b;*/\n}\n\n.deleted-header {\n  background-color: #252525;\n  /*background-color: red;*/\n}\n\n.column-header {\n  text-align: center;\n  font-size: 18px;\n  border-style: solid;\n  border-width: thin;\n  border-color: #d4d4d4;\n  margin-right: .02em;\n  margin-left: .02em;\n  color: #ffffff;\n  padding-top: .30em;\n  padding-bottom: .30em;\n}\n\n.task-item {\n  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n  margin-left: .5em;\n  margin-right: .5em;\n  margin-bottom: .50em;\n  margin-top: .50em;\n  background-color: #e0e2e4;\n  border-style: solid;\n  border-width: thin;\n  border-color: #d4d4d4;\n}\n\n.undo-label-div label{\n  color: white;\n  background-color: orange;\n  padding-left: 3px;\n  padding-right: 3px;\n  font-size: 14px;\n}\n\n.task-item-header {\n  padding-left: 5px;\n  padding-top: 2.5px;\n  margin-bottom: .50em;\n  border-style: solid;\n  border-width: thin;\n  border-color: gray;\n  border-top: none;\n  border-left: none;\n  border-right: none;\n  background-color: #373854;\n  color: white;\n  font-weight: bold;\n}\n\n.task-item-name {\n  display: inline-block;\n  font-size: 14px;\n  vertical-align: top;\n  width: 85%;\n}\n\n.overdue-icon {\n  color: yellow;\n}\n.task-item-pic {\n  display: inline-block;\n  width: 12%;\n  vertical-align: top;\n  margin-bottom: 1px;\n}\n\n.task-item-pic img {\n  float: right;\n}\n\n.profile-pic-sm {\n  height: 20px;\n  width: 20px;\n}\n\n.task-item-body {\n  padding-left: 5px;\n  padding-right: 5px;\n  padding-bottom: 5px;\n  /*margin: 5px;*/\n}\n\n.task-item-top-line {\n  font-style: italic;\n  font-size: 12px;\n  margin-bottom: .50em;\n  margin-top: .50em;\n}\n\n.overdue-label {\n  background-color: yellow; \n  color: black;\n  padding-left: 5px;\n  padding-right: 5px; } \n \n.task-item-frequency {\n  display: inline-block;\n  font-size: 12px;\n}\n\n.task-item-description {\n  font-size: 14px;\n  margin-bottom: .50em;\n  text-align: justify;\n}\n\n.task-item-bottom-line {\n  overflow: hidden;\n  height: auto;\n}\n\n.bottom-label {\n  display: inline-block;\n  /*border-color: #2e2e2e;*/\n /* padding: .25em;*/\n  padding-left: 5px;\n  padding-right: 5px;\n  font-size: 14px;\n}\n\n.task-item-icons {\n  border-top-style: solid;\n  border-top-width: thin;\n  border-top-color: #999999;\n  padding-top: 2px;\n  margin-top: 5px;\n}\n\n.status-buttons {\n  display: inline-block;\n  width: 63%;\n  vertical-align: top;\n}\n\n.status-buttons label {\n  float: left;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.start-btn:hover, .pause-btn:hover,\n.complete-btn:hover, .edit-btn:hover,\n.delete-btn:hover, .not-started-btn:hover,\n.skip-btn:hover {\n  cursor: pointer;\n  background-color: #4caf50;\n}\n\n.edit-buttons {\n  display: inline-block;\n  width: 33%;\n  vertical-align: top;\n}\n\n.edit-buttons label {\n  float: right;\n  padding-left: 5px;\n  padding-right: 5px;\n}\n\n.edit-btn i {\n  color: black;\n}\n\n.add-task-button {\n  text-align: center;\n  padding-top: 1em;\n}\n\n.undo-completed-task {\n  text-decoration: none;\n}\n\n.undo-label-div label{\n  color: white;\n  background-color: orange;\n  padding-left: 3px;\n  padding-right: 3px;\n  font-size: 14px;\n}\n\n.undo-completed-task {\n  text-decoration: none;\n}\n\n.add-task-form {\n  margin: 0 auto;\n  width: 400px;\n  padding: 1em;\n  border: 1px solid;\n  border-radius: 1em;\n}\n\n.add-task-form input, textarea {\n  width: 200px;\n}\n\n/* for the div around each of \n * the form sections*/\n .form-block {\n  margin-top: 1em;\n} \n\n.form-label {\n  display: inline-block;\n  width: 150px;\n  text-align: left;\n}\n\n.dropdown {\n  display: inline-block;\n}\n\n/* dropdown content. hidden by default */\n.new-color-content, .dropdown-content {\n  /* display: none; */\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 200px;\n  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n  cursor: pointer;\n}\n\n.dropdown-input {\n  width: 178px;\n}\n\n.drop-arrow {\n  text-align: right;\n}\n\n/* highlight items inside the dropdown*/\n.color-option:hover, \n.category-option:hover,\n.owner-option:hover,\n.created-by-option:hover\n{ \n  background-color: #3e8e41;\n}\n\n.color-option, .category-option {\n  padding: .2em;\n}\n\n\n.grid-container {\n  border-top-style: solid;\n  border-left-style: solid;\n  border-right-style: solid;\n  border-color: #d9d9d9;\n  border-width: thin;\n}\n\n.grid-header {\n  background-color: #dddddd;\n  padding-top: 1em;\n  padding-bottom: 1em;\n}\n\n.grid-item-left {\n  display: inline-block;\n  width: 33%;\n  vertical-align: middle;\n}\n\n.grid-item-middle {\n  display: inline-block;\n  width: 33%;\n  vertical-align: middle;\n  text-align: center;\n}\n\n.grid-item-right {\n  display: inline-block;\n  width: 33%;\n  padding-right: 1px;\n  vertical-align: middle;\n  text-align: right;\n}\n\n.btn {\n  font-size: 14px;\n  top: 5em;\n  bottom: 5em;\n  padding: 6px 12px;\n}\n\n.btn, .smallBtn{\n  font-weight: 600;\n  line-height: 20px;\n  white-space: nowrap;\n  cursor: pointer;\n  user-select: none;\n  border-radius: 3px;\n  color: #fff;\n  text-shadow: 0 -1px 0 rgba(0,0,0,0.15);\n  background-color: #6cc644;\n}\n\n.btn-primary {\n  background-image: linear-gradient(#91dd70, #55ae2e);\n  border: 1px solid #5aad35;\n}\n\n.new-category-row {\n}\n\n.grid-row {\n  border-bottom-style: solid;\n  border-bottom-color: #d9d9d9;\n  border-width: thin;\n}\n\n.grid-item {\n  display: block;\n  /*width: 60%;*/\n  padding-top: 1em;\n  padding-bottom: 1em;\n}\n\n.new-category-input, .new-user-input {\n  font-size: 16px;\n  padding: .50em;\n  display: inline-block;\n}\n\n.category-input {\n  font-size: 16px;\n  padding: .50em;\n}\n\n.new-category-dropdown {\n  display: inline-block;\n}\n\n.new-category-dropdown,\n.new-user-color-dropdown,\n.edit-color-dropdown,\n.edit-user-color-dropdown{\n  border-style: solid;\n  border-width: thin;\n  border-color: white;\n  padding: 5px;\n}\n\n.edit-color-dropdown:hover,\n.edit-color-label:hover,\n.edit-color-name:hover,\n.edit-color-dropdown-caret:hover,\n.new-category-dropdown:hover,\n.new-color-label:hover,\n.new-color-name:hover,\n.new-color-dropdown-caret:hover {\n  cursor: pointer;\n}\n\n.edit-color-label, .new-color-label {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.edit-color-content, .new-color-content,\n .dropdown-content {\n  position: absolute;\n  background-color: #f9f9f9;\n  min-width: 100px;\n  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);\n}\n\n\n.edit-color-Name, .new-color-name {\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.edit-color-option:hover, \n.edit-color-swatch:hover,\n.edit-color-swatch-name:hover,\n.new-color-swatch:hover,\n.new-color-swatch-name:hover,\n.new-color-option:hover {\n  background-color:#5b8e3e;\n  cursor: pointer;\n}\n\n.swatch {\n  width: 25px;\n  height: 25px;\n  display: inline-block;\n  vertical-align: middle;\n  border-style: solid;\n  border-width: thin;\n  border-color: gray;\n}\n\n.category-label {\n  font-size: 18px;\n  padding: .50em;\n  box-shadow: 0 -4px -8px 0 rgba(0,0,0,0.2);\n  border-radius: .2em;\n  margin-left: .25em;\n}\n\n.category-count {\n  display: inline-block;\n  width: 50%;\n}\n\n.edit-section {\n  padding-top: 1em;\n  padding-bottom: 1em;\n  padding-right: 10px;\n  text-align: right;\n}\n\n.admin-form-block {\n  display: inline-block;\n}\n\n/* admin page start */\n.user-task-count {\n  display: inline-block;\n  width: 50%;\n}\n\n.admin-form-label,.admin-form-input {\n  display: block;\n}\n\n/* admin page end */", ""]);

// exports


/***/ }),

/***/ 134:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(136);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 136:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
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