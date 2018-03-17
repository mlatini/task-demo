const Database = require('../src/server/database'), 
  db = new Database();

exports.editCategories = function (req, res) {
  db.initialize(req.session.sessionId, (err) => {
    if(!err) {
      db.getAllCategories({ 
        'populateColor': true, 
        'populateTasksWithCategory': true 
      }, (err, categories) => {
        db.getSettings( (err, settings) => {
            var activeCategoryCount = 0;
            var archivedCategoryCount = 0;
            categories.forEach(function(category) {
              if(category.archived) {
                archivedCategoryCount++;
              } else {
                activeCategoryCount++;
              }
            });
            var context = {
              loggedInUserFullName : req.user.firstName + ' ' +
                req.user.lastName,
              showArchived : settings.categories.showArchivedTasks,
              archivedCategoryCount : archivedCategoryCount,
              activeCategoryCount : activeCategoryCount,
              categories : categories.map(function(category) {
                var activeTasksWithCategory = 0;
                category._tasksWithCategory.forEach(function(task) {
                  if(task.status.paused || task.status.inProgress || 
                    task.status.notStarted) {
                    activeTasksWithCategory++;
                  }
                });
                return {
                  id : category.id,
                  name : category.name,
                  archived : category.archived,
                  colorName : category._color.name,
                  colorBgHex : category._color.bgHex,
                  colorFgHex : category._color.fgHex,
                  activeTasksWithCategory : activeTasksWithCategory,
                  colorId : category._color.id
                };
              }),
            };
            res.render('edit-categories', context);
          });
        });
    }
  });
};

