exports.updateSettings = ((req, res) => {
  const Database = require('../src/server/database');

  let db = new Database();

  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.updateSettings(req.body, (err, settings) => {
        if(err) {
          res.send({ 'error': err, 'settings': null });
        } else {
          res.send({ 'error': null, 'settings': settings });
        }
      });
    }
  });
});