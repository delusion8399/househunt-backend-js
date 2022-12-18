const { Database } = require('../utils/database');
const environments = require('../environments');

module.exports = async function init() {
  const db = new Database(environments.databases);
  await db.connectDatabases();
  return true;
};
