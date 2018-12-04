const fs = require('fs')
const uniqId = require('uniqid')
const path = require('path')

const openNotesFile = () => {
  ensureExists(__dirname + 'data/notes');
}

const getAllNotesIds = (notesFolder) => {
  ensureExists(notesFolder)
  return fs.readdirSync(notesFolder).map(file => {
    const fileName = /(.+)(\.)(json)$/.exec(file)
    return fileName ? fileName[1] : fileName
  })
}

const getNote = (noteId) => {
  return JSON.parse(fs.readFileSync(path.join(__dirname, `data/notes/${noteId}.json`)))
}

const getNotePromise = (noteId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `data/notes/${noteId}.json`), (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

const writeNote = (data) => {
  fs.writeFile(path.join(__dirname, `data/notes/${data.id}.json`), JSON.stringify(data), (err) => {
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
  fs.writeFileSync(path.join(__dirname, `data/notes/${noteId}.json`), JSON.stringify(data));
  return data;
}

const ensureExists = (dir) => {
  const splittedDir = dir.split('/');
  splittedDir.forEach((currentDir, index, fullDir) => {
    const iterationDir = '/' + fullDir.slice(1, index + 1).join('/')
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
}