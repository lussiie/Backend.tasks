function parseBody(req, callback) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    try {
      const data = JSON.parse(body);
      callback(null, data);
    } catch (err) {
      callback(err, null);
    }
  });
}

module.exports = parseBody;
