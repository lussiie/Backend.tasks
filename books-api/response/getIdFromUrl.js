function getIdFromUrl(url) {
  const parts = url.split("/");
  return parseInt(parts[2]);
}
module.exports = getIdFromUrl;