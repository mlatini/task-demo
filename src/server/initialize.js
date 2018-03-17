module.exports = function initialize() {
  return function (req, res, next) {
    const uuidv1 = require('uuid/v1'), 
      Database = require('../server/database');

    let db = new Database(), 
      userMatch = false;
    // Generate the sessionId and stuff it in the session
    // if there is no sessionId then it means this is a new
    // (or expired) user.
    if(!req.session.sessionId) {
      // Since this is the first time the app is run after the DB has been 
      // created, populate req.session.sessionId and req.user. 
      // At this point there is only a single user. 
      req.session.sessionId = uuidv1(); 
    } 
    // Initialize the current user into the session. In the event that 
    // the data store gets deleted or the cookie gets deleted or the 
    // session expires req.user will be left populated with a 
    // non-existent user. 
    // Therefore I need to compare req.user against all current 
    // users in this tenant to make sure it's one of them. 
    // If it is one of the current users then leave the key alone.. 
    // If it's not one of the current users then replace it with user[0], 
    // which is the default admin at database creation. 
    db.initialize(req.session.sessionId, (err) => {
      if(err) {
        next();
      } else {
        db.getAllUsers({}, (err, users) => {

          if(users && req.session) {
            if(req.user) {
              for(let i = 0, max = users.length; i < max; i += 1) {
                if(req.user.id === users[i].id) {
                  userMatch = true;
                  break;
                }
              }
            }
            if(userMatch === false) {
              // req.user does not match one of the existing users. 
              req.user = users[0];
            }
            next();
          } else {
            next();
          }
        });
      }
    });
  };
};