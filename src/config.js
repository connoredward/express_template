const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  masterKey: process.env.API_KEY,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGODB_URL || 'mongodb://mongo:27017/api'
  }
};
