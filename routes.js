var tasks = require('./handlers/tasks');
var api = require('./handlers/api');

module.exports = ((app) => {
  // task
  app.get('/tasks', tasks.tasks);

  // api
  app.post('/api/settings/update', api.updateSettings);

  app.post('/api/task/update-status', api.updateTaskStatus);

  app.get('/api/task/get-task/:id', api.getTask);

  app.post('/api/task/save-new-task', api.saveNewTask);

  app.post('/api/task/delete/:id', api.deleteTask);
  app.post('/api/task/delete-previous/:id', api.deletePreviousTask);
});