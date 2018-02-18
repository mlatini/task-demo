module.exports = function initialize() {
const uuidv1 = require('uuid/v1');
  return function (req, res, next) {
    let Database = require('./database'); 

  // Generate the sessionId and stuff it in the session
  // if there is no sessionId then it means this is a new
  // (or expired) user.
  if(!req.session.sessionId) {
    req.session.sessionId = uuidv1(); 
  }
  return next();
  };
};