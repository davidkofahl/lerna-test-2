const path = require('path');
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const BUILD_DIR = path.join(ROOT_DIR, 'builds');
const APP_DIR = path.resolve(process.cwd());

module.exports = {
  ROOT_DIR,
  BUILD_DIR,
  APP_DIR,
};
