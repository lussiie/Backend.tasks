const fs = require("fs");
const path = require("path");
const parseConfig = require("./modules/config-parser");

console.log("START");

const configPath = path.join(__dirname, "config.env");

fs.readFile(configPath, "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const config = parseConfig(data);

  // validation
  if (!config.PORT || !config.DB_HOST || !config.DB_USER) {
    console.error("Missing required config fields!");
    return;
  }

  console.log("CONFIG LOADED:");
  console.log(config);
  console.log("DONE");
});