const fs = require("fs");
const path = require("path");
const dirs = require("./modules/dirs");

console.log("START");

dirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);

  fs.mkdir(fullPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating:", dir);
      return;
    }

    console.log("Created:", fullPath);
  });
});

console.log("DONE");