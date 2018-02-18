const expect = require('chai').expect,
uuidv1 = require('uuid/v1'),
Database = require('../src/server/database')

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
    it('should return an array with tasks.owner if "owner" is passed to' +
      ' options', function(done) {
        database.getAllTasks({ 'owner': true }, function(err, tasks) {
          expect(tasks[0].owner).to.not.be.an('undefined');
          done();
        });
      });
  });
});
