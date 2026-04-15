const fs = require("fs");
const path = require("path");
const formatLog = require("./modules/logger");

console.log("START");

const logPath = path.join(__dirname, "app.log");

const logMessage = formatLog("Server started");

fs.appendFile(logPath, logMessage, (err) => {
  if (err) {
    console.error("Error writing log:", err);
    return;
  }

  console.log("DONE");
});