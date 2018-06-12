const express = require('express'),
  handlebars = require('express-handlebars'),
  cookieSession = require('cookie-session'),
  initialize = require('./src/server/initialize'),
  bodyParser = require ('body-parser'),
  flash = require('connect-flash'),
  path = require('path');

const app = express();

app.engine('.hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    dateFormat: require('handlebars-dateformat')
  }
}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname,  'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Flash messages
app.use(flash());

// Initialize the session ID 
app.use(initialize({

}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

   // The routes
require('./routes.js')(app); 

app.listen(process.env.PORT || 3000, (( () => {
  console.log('Task demo listening on port 3000');
})));

