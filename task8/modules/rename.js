function getNewName(oldName, index) {
  return `file_${index}_${oldName}`;
}

module.exports = getNewName;