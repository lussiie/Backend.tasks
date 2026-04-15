const fs = require("fs");
const path = require("path");
const render = require("./modules/template-engine");

console.log("START");

const templatePath = path.join(__dirname, "template.txt");
const outputPath = path.join(__dirname, "output.txt");

const template = fs.readFileSync(templatePath, "utf-8");

const result = render(template, {
  name: "Lusine",
  age: 20,
  city: "Yerevan"
});

fs.writeFileSync(outputPath, result);

console.log("DONE");