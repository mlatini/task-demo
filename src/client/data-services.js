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
  
