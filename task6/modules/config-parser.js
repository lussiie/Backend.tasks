function parseConfig(content) {
  const obj = {};

  content.split("\n").forEach(line => {
    const [key, value] = line.split("=");

    if (key && value) {
      obj[key.trim()] = value.trim();
    }
  });

  return obj;
}

module.exports = parseConfig;