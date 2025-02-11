import type Database from '../database/Database';

class Controller {
  protected readonly _database: Database;

  constructor(database: Database) {
    this._database = database;
  }
}

export default Controller;
