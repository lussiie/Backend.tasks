function formatLog(message) {
  return `[${new Date().toISOString()}] ${message}\n`;
}

module.exports = formatLog;