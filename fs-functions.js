const fs = require('fs')
const uniqId = require('uniqid')
const path = require('path')

const { getConfig } = require('./config')

const isExecutable = () => {
  if (__dirname.match('.asar')) {
    return true
  }
  return false
}

const folder__dirname = isExecutable() ? path.join(__dirname, '..', '..') : __dirname

const openNotesFile = () => {
  ensureExists(getConfig().notesPath);
}

const getAllNotesIds = (notesFolder) => {
  ensureExists(notesFolder)
  return fs.readdirSync(notesFolder).map(file => {
    const fileName = /(.+)(\.)(json)$/.exec(file)
    return fileName ? fileName[1] : fileName
  })
}

const getNote = (noteId) => {
  return JSON.parse(fs.readFileSync(`${getConfig().notesPath}/${noteId}.json`))
}

const getNotePromise = (noteId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${getConfig().notesPath}/${noteId}.json`, (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

const writeNote = (data) => {
  fs.writeFile(`${getConfig().notesPath}/${data.id}.json`, JSON.stringify(data), (err) => {
    if (err) throw err
  });
}

const createNote = (isMaster = false) => {
  const noteId = uniqId();
  const data = {
    id: noteId,
    title: 'Untitled',
    note: 'Enter note text here...',
    isMaster,
  }
  fs.writeFileSync(`${getConfig().notesPath}/${noteId}.json`, JSON.stringify(data));
  return data;
}

const ensureExists = (dir) => {
  const splittedDir = dir.split(path.sep);
  splittedDir.forEach((currentDir, index, fullDir) => {
    const iterationDir = path.sep + fullDir.slice(1, index + 1).join(path.sep)
    if (!fs.existsSync(iterationDir)) {
      fs.mkdirSync(iterationDir)
    }
  })
}

const isPathExists = (dir) => {
  return fs.existsSync(dir)
}

const clearPath = (dir) => {
  ensureExists(dir)
  fs.readdirSync(dir).forEach((file) => {
    fs.unlinkSync(path.join(dir, file))
  })
}

const removeFile = (dir) => {
  fs.unlink(dir, (err) => {
    if (err) throw new Error(err)
  })
}

module.exports = {
  openNotesFile,
  getAllNotesIds,
  getNote,
  getNotePromise,
  writeNote,
  createNote,
  isPathExists,
  clearPath,
  removeFile,
  isExecutable,
  folder__dirname,
}