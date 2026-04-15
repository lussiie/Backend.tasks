const path = require("path");

function getBackupPath(filePath) {
  const ext = path.extname(filePath);
  const name = path.basename(filePath, ext);

  return path.join(__dirname, `${name}_backup${ext}`);
}

module.exports = getBackupPath;