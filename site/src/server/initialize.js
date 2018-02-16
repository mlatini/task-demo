module.exports = function initialize() {
const uuidv1 = require('uuid/v1');
  return function _initialize(req, res, next) {
    let Database = require('./database'); 

  // Generate the sessionId and stuff it in the session
  // if there is no sessionId then it means this is a new
  // (or expired) user.
  if(!req.session.sessionId) {
    req.session.sessionId = uuidv1(); 
  }

  // Initialize the database file if it doesn't exist. 
  let database = new Database(req.session.sessionId);
  database.initialize(( (err) => {
    if(!err);
    next();
  }));
  };
};