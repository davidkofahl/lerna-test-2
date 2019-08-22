const fs = require('fs');

const listFiles = (dir, acc = []) => {
  const files = fs.readdirSync(dir) || [];

  files.forEach((value) => {
    // const name = `${dir}/${value}`;
    console.log('[listFiles] - VALUE: ', value);
    const name = `${dir}/${value}`;

    if (fs.statSync(name).isDirectory()) {
      listFiles(name, acc);
    } else {
      acc.push(name);
    }
  })

  return acc;
}

module.exports = listFiles;
