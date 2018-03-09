var tasks = require('./handlers/tasks');
var api = require('./handlers/api');

module.exports = ((app) => {
  // task
  app.get('/tasks', tasks.tasks);

  // api
  app.post('/api/settings/update', api.updateSettings);
});