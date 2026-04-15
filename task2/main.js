const fs = require("fs");
const path = require("path");
const filterFiles = require("./modules/filter");

const dir = process.argv[2];
const ext = process.argv[3];

if (!dir || !ext) {
  console.log("Usage: node main.js <dir> <ext>");
  process.exit(1);
}

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  const filtered = filterFiles(files, ext);

  filtered.forEach(file => {
    const fullPath = path.resolve(path.join(dir, file));
    console.log(fullPath);
  });
});