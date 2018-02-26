const expect = require('chai').expect,
Database = require('../src/server/database');

let database = new Database(),
uuid = 123;

describe('Database', function() { 
  describe('#initialize()', function () {
    it('should return error when passed empty null UUID', function (done) {
      database.initialize('', function(err) {
        expect(err).to.be.a('string');
        done();
      });
    });
    it('should return null err when passed UUID', function (done) {
      database.initialize(uuid, function(err) {
        expect(err).to.be.a('null');
        done();
      });
    });
  });
  describe('#getAllTasks()', function() {
    it('should return an array, empty or non-empty', function(done) {
      database.getAllTasks({'bad property' : 'bad'}, function(err, tasks) {
        expect(tasks).to.be.an('array');
        done();
      });
    });
    it('should return an object of tasks[x].owner if "populateOwner" is ' + 
     'passed to options', function(done) {
        database.getAllTasks({ 'populateOwner': true }, function(err, tasks) {
          expect(tasks[0].owner).to.be.an('object');
          done();
        });
      });
    it('should return an object of task[x].category is populateCategories ' +
      'is passed to options', function(done) {
        database.getAllTasks({ 'populateCategory': true }, function(err, tasks) {
          expect(tasks[0].category).to.be.an('object');
          done();
        });
      });
  });
});
