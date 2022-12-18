const env = process.env.NODE_ENV || 'development';
console.log(`Environment: ${env}`);
const devEnv = require('./development.env');
const prodEnv = require('./production.env');

module.exports = env === 'development' ? devEnv : prodEnv;
