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
      db.updateTaskStatus(req.body.task, (err, task) => {
        if(err) {
          res.send({ 'error': err, 'task': null });
        } else {
          res.send({ 'error': null, 'task': task});
        }
      });
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
          res.send({ 'error': null, 'task': task });
        } else {
          res.send({ 'error': err, 'task': null });
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