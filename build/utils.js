const beautify = require('js-beautify').js_beautify;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function createMissingDirs(dir) {
    mkdirp.sync(dir, function(err) {
      if (err) console.error(err)
    })
}
function beautifySchema(schema) {
  const beautifiedSchema = beautify(JSON.stringify(schema), {
    indent_size: 2
  });
  return beautifiedSchema;
}
function writeToFile(string, filePath, append) {
  return new Promise((resolve, reject) => {
    let destDir = path.dirname(filePath);
    createMissingDirs(destDir);
    if (append) {
      fs.appendFile(filePath, string, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } else {
      fs.writeFile(filePath, string, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }
  });
}

module.exports = {
  writeToFile: writeToFile,
  beautifySchema: beautifySchema
};
