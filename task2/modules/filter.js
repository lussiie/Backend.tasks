function filterFiles(files, ext) {
  return files.filter(file => file.endsWith(ext));
}

module.exports = filterFiles;