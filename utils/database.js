/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const constants = require('../bin/constants');

const connectedDbs = {};
class Database {
  constructor(configs) {
    this.configs = configs;
  }

  async createConnection(uri, dbName) {
    const conn = await mongoose.createConnection(
      uri,
      constants.databaseOptions,
    );
    connectedDbs[dbName] = conn;
    console.log(`connected to ${dbName}`);
  }

  async connectDatabases() {
    console.log('connecting to databases...');
    const dbNames = Object.keys(this.configs);
    for (const dbName of dbNames) {
      const dbURI = this.configs[dbName];
      await this.createConnection(dbURI, dbName);
    }
  }
}

module.exports = { Database, connectedDbs };
