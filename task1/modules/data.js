function toCamel(str) {
  return str.replace(/_([a-z])/g, (_, l) => l.toUpperCase());
}

function transform(obj) {
  let res = {};
  for (let key in obj) {
    res[toCamel(key)] = obj[key];
  }
  return res;
}

module.exports = transform;