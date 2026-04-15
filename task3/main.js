const fs = require("fs");
const path = require("path");
const generateHTML = require("./modules/template");

console.log("START");

const title = "My Page";

const filePath = path.join(__dirname, "index.html");

const html = generateHTML(title);

fs.writeFile(filePath, html, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("DONE");
});