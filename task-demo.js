const express = require('express');
const handlebars = require('express-handlebars');
const cookieSession = require('cookie-session');
const initialize = require('./src/server/initialize');

const app = express();

app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    dateFormat: require('handlebars-dateformat')
  }
}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/dist'));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Initialize the session ID 
app.use(initialize({

}));

   // The routes
require('./routes.js')(app); 

app.listen(3000, (( () => {
  console.log('Task demo listening on port 3000');
})));

