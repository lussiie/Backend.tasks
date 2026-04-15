const fs = require("fs");
const path = require("path");
const transform = require("./modules/data");

console.log("START");

const inputPath = path.join(__dirname, "input.json");
const outputPath = path.join(__dirname, "output.json");

const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

const result = transform(data);

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

console.log("DONE");