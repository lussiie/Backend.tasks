const fs = require("fs");
const path = require("path");
const getBackupPath = require("./modules/path-gen");

console.log("START");

const src = path.join(__dirname, "file.txt");
const dest = getBackupPath(src);

fs.copyFile(src, dest, (err) => {
  if (err) {
    console.error("Copy error:", err);
    return;
  }

  console.log("FILE COPIED SUCCESSFULLY");
  console.log("DONE");
});