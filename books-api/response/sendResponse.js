
function sendResponse(res, statusCode, data = null) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(statusCode);
  if (data !== null) {
    res.end(JSON.stringify(data));
  } else {
    res.end();
  }
}

module.exports = sendResponse;