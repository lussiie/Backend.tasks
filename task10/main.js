const fs = require("fs");
const path = require("path");
const data = require("./modules/data");

console.log("START");

const filePath = path.join(__dirname, "output.json");

fs.stat(filePath, (err, stats) => {
  if (err || stats.size < 1024) {

    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error("Write error:", err);
        return;
      }

      console.log("FILE CREATED / UPDATED");
      console.log("DONE");
    });

  } else {
    console.log("File is already big enough, skipping write");
    console.log("DONE");
  }
});