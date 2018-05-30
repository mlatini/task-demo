const Database = require('../src/server/database');

let db = new Database();

exports.adminGet = function (req, res) {
  db.initialize(req.session.sessionId, (err) => {
    if(err) {
      res.status(500).json({ 'error': err });
    } else {
      db.getAllUsers({
        'populateRoles': true,
        'populateOwnedTasks': true,
        'populateColor': true
      },
        (err, users) => {
          db.getSettings( (err, settings) => {
            var activeUsersCount = 0;
            var archivedUsersCount = 0;
            users.forEach(function (user) {
              if (user.archived) {
                archivedUsersCount++;
              } else {
                activeUsersCount++;
              }
            });
            var context = {
              showArchivedUsers: settings.admin.showArchivedUsers,
              loggedInUserFullName: req.user.firstName + ' ' +
                req.user.lastName,
              activeUsersCount: activeUsersCount,
              archivedUsersCount: archivedUsersCount,
              users: users.map(function (user) {
                var adminUser = false;
                var regularUser = false;
                var activeTasks = 0;
                user._roles.forEach(function (role) {
                  if (role.name === 'Admin') {
                    adminUser = true;
                  }
                  if (role.name === 'User') {
                    regularUser = true;
                  }
                });
                user._ownedTasks.forEach(function (task) {
                  if (task.status.paused || task.status.inProgress ||
                    task.status.notStarted) {
                    activeTasks++;
                  }
                });
                return {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  fullName: user.firstName + ' ' + user.lastName,
                  bgHex: user._color.bgHex,
                  fgHex: user._color.fgHex,
                  colorName: user._color.name,
                  roles: user._roles,
                  isAdmin: adminUser,
                  isUser: regularUser,
                  archived: user.archived,
                  activeTasks: activeTasks
                };
              })
            };
            res.render('admin', context);
          });
        });
    }
  });
};


