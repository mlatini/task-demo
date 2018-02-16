var tasks = require('./handlers/tasks');

module.exports = (( (app) => {
  // task
  app.get('/', tasks.home);
}));