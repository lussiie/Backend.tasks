const fs = require("fs");
const path = require("path");
const getNewName = require("./modules/rename");

console.log("START");

const dir = path.join(__dirname, "test");

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file, index) => {
    const oldPath = path.join(dir, file);
    const newName = getNewName(file, index);
    const newPath = path.join(dir, newName);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Rename error:", err);
        return;
      }

      console.log(`Renamed: ${file} → ${newName}`);
    });
  });

  console.log("DONE");
});