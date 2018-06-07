const tasks = require('./handlers/tasks'),
  api = require('./handlers/api'),
  categories = require('./handlers/categories'),
  admin = require('./handlers/admin');

module.exports = ((app) => {
  // task
  app.get('/', tasks.tasks);
  app.get('/tasks', tasks.tasks);
  app.get('/task/edit/:id', tasks.editTaskGet);
  app.post('/task/edit', tasks.editTaskPost);
  app.get('/add-task', tasks.addTaskGet);
  app.post('/add-task', tasks.addTaskPost);

  // Categories
  app.get('/edit-categories', categories.editCategories);

  app.get('/admin', admin.adminGet);


  // api
  app.post('/api/settings/update', api.updateSettings);

  app.post('/api/task/update-status', api.updateTaskStatus);

  app.get('/api/task/get-task/:id', api.getTask);

  app.post('/api/task/save-new-task', api.saveNewTask);

  app.post('/api/task/delete/:id', api.deleteTask);
  app.post('/api/task/delete-previous/:id', api.deletePreviousTask);

  app.get('/api/user/get-all-users', api.getAllUsers);
  app.post('/api/user/save-new-user', api.saveNewUser);
  app.post('/api/user/update', api.updateUser);
  app.post('/api/user/current/change', api.changeCurrentUser);

  app.get('/api/get-all-colors', api.getAllColors);

  app.post('/api/category/update', api.updateCategory);
  app.post('/api/category/save-new', api.saveNewCategory);
  app.post('/api/category/archive/:id', api.archiveCategory);
  app.post('/api/category/un-archive/:id', api.unArchiveCategory);
});