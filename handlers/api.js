exports.updateSettings = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => { if(!err) { db.updateSettings(req.body.settings, (err, settings) => {
        if(err) {
          res.send({ 'error': err, 'settings': null });
        } else {
          res.send({ 'error': null, 'settings': settings });
        }
      });
    }
  });
});

exports.updateTaskStatus = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.findTaskByIdAndUpdate(req.body.task.id, req.body.task, (err, task) => {
        if(err) {
          res.send({ 'error': err, 'task': null });
        } else {
          res.send({ 'error': null, 'task': task});
        }
      });
    }
  });
});

exports.updateCategory = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.findCategoryByIdAndUpdate(req.body.category.id, req.body.category, 
        (err, category) => {
          if(err) {
            res.send({ 'error': err, 'category': null });
          } else {
            res.send({ 'error': null, 'category': category });
          }
      });
    }
  });
});

exports.updateUser = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.findUserByIdAndUpdate({ 
        'user': req.body.user,
        'roles': req.body.roles,
        'currentlyAdmin': req.body.currentlyAdmin,
        'currentlyUser': req.body.currentlyUser
      }, (err, user) => {
        if(err) {
          res.send({ 'error': err, 'user': null });
        } else {
          res.send({ 'error': null, 'user': user });
        }
      });
    }
  });
});

exports.getAllUsers = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      res.send({ 'error': err, 'users': null });
    } else {
      db.getAllUsers({}, (err, users) => {
        if(err) {
          res.send({ 'error': err, 'users': null });
        } else {
          res.send({ 'error': null, 'users': users });
        }
      });
    }
  });
});

exports.getAllColors = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      res.send({ 'error': err, 'colors': null });
    } else {
      db.getAllColors({}, (err, colors) => {
        if(err) {
          res.send({ 'error': err, 'colors': null });
        } else {
          res.send({ 'error': null, 'colors': colors });
        }
      })
    }
  });
});

exports.getTask = ((req, res) => {
  const Database = require('../src/server/database'), 
    taskId = req.params.id;
  
  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.getTaskById({ 'id': taskId }, (err, task) => {
        if(err) {
          res.send({ 'error': err, 'task': null });
        } else {
          res.send({ 'error': null, 'task': task});
        }
      });
    }
  });
});

exports.saveNewTask = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.saveNewTask(req.body.task, (err, task) => {
        if(err) {
          res.send({ 'error': err, 'task': null });
        } else {
          res.send({ 'error': null, 'task': task });
        }
      });
    }
  });
});

exports.saveNewUser = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.saveNewUser(req.body.user, (err,user) => {
        if(err) {
          res.send({ 'error': err, 'task': null });
        } else {
          res.send({ 'error': null, 'user': user });
        }
      });
    }
  });
});

exports.saveNewCategory = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.saveNewCategory(req.body.category, (err, category) => {
        if(err) {
          res.send({ 'error': err, 'category': null });
        } else {
          res.send({ 'error': null, 'category': category });
        }
      });
    }
  });
});

exports.archiveCategory = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database(), 
    archivedCategory = {};

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      archivedCategory.archived = true;
      db.findCategoryByIdAndUpdate(req.params.id, archivedCategory, (err) => {
        if(err) {
          res.send({ 'error': err });
        } else {
          res.send({ 'error': null });
        }
      });
    }
  });
});

exports.unArchiveCategory = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database(), 
    unArchivedCategory = {};

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      unArchivedCategory.archived = false;
      db.findCategoryByIdAndUpdate(req.params.id, unArchivedCategory, (err) => {
        if(err) {
          res.send({ 'error': err });
        } else {
          res.send({ 'error': null });
        }
      });
    }
  });
});

exports.deleteTask = ((req, res) => {
  const Database = require('../src/server/database'), 
    taskId = req.params.id || null;

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      res.send({ 'error': err, 'task': null });
    } else {
      if(!taskId) {
        res.send({ 'error': 'Empty taskId' });
      } else {
        db.deleteTask(taskId, (err, deletedTask) => {
          if(err) {
            res.send({ 'error': err, 'task': null });
          } else {
            res.send({ 'error': null, 'task': deletedTask });
          }
        });
      }
    }
  });
});

exports.deletePreviousTask = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database(), 
    error = null,
    returnTask = null;

  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      error = err;
      returnTask = null;
    } else {
      db.getTaskByPreviousTaskId(req.params.id, (err, taskToDelete) => {
        if(err) {
          error = err;
          returnTask = null;
        } else {
          db.deleteTask(taskToDelete.id, (err, deletedTask) => {
            if(err) {
              error = err;
              returnTask = null;
            } else {
              error = null;
              returnTask = deletedTask;
            }
          });
        }
      });
    }
    res.send({ 'error': error, 'task': returnTask });
  });
});