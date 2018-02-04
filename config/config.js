const path = require('path');
const rootPath = path.normalize(__dirname+'/../');

module.exports = {
  db: 'mongodb://localhost/wait4me',
  rootPath: rootPath
};
