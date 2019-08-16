const fs = require('fs');

const findFile = (fileName, dir) => {
  const walk = (dir, pkgs = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const path = dir + '/' + file;

      if (file === fileName) {
        pkgs.push(path);
      } else if (fs.statSync(path).isDirectory()) {
        walk(path, pkgs);
      }
    });

    return pkgs;
  }

  return walk(dir);
};

// const pkgs = findFile('package.json', process.cwd() + '/common');
module.exports = findFile;
