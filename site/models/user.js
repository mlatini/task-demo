module.exports = function User() {
    this.id = '';
    this.name = '';
    this._color = '';
    this._settings = '';
    this._roles = [];
    this._ownedTasks = [];
    this.archived = false;
  };