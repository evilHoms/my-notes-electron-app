const { app, BrowserWindow } = require('electron')
const dotenv = require('dotenv')
const path = require('path')

const {
  getAllNotesIds,
  createNote,
  getNote,
  isPathExists,
  clearPath,
  removeFile,
} = require('./fs-functions')
const { createMainNoteHtml } = require('./createHtml')

dotenv.config();
clearPath(path.join(__dirname, 'html'))

const notesPath = path.join(__dirname, process.env.NOTES_PATH)
const notesIdsArray = getAllNotesIds(notesPath)
const notesDataArray = []

if (notesIdsArray.length) {
  notesIdsArray.forEach((noteId, index) => {
    notesDataArray.push(getNote(noteId))
    if (!isPathExists(path.join(__dirname, `html/${noteId}.html`))) {
      index === 0 ?
        createMainNoteHtml(notesDataArray[index]) :
        console.log('CREATE CHILD NOTE HTML')
    } 
  })
} else {
  const newNote = createNote();
  notesDataArray.push(newNote)
  notesIdsArray.push(newNote.id)
  createMainNoteHtml(notesDataArray[0])
}

// let childWindow

const createMainWindow = ({ id }) => {
  // Create the browser window.
  notesDataArray[0].browserWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    // TODO add resize, save window size and position on screen
    resizable: false,
  })

  notesDataArray[0].browserWindow.loadFile(`html/${id}.html`)

  notesDataArray[0].browserWindow.on('closed', function () {
    removeFile(path.join(__dirname, `html/${notesDataArray[0].id}.html`))
    notesDataArray[0].browserWindow = null
  })
}

// TODO create all child windows
// const createAnotherWindow = () => {
//   childWindow = new BrowserWindow({
//     width: 400,
//     height: 400,
//     frame: false,
//     resizable: false,
//     parent: mainWindow,
//   })

//   childWindow.loadFile('index.html')

//   childWindow.on('closed', function () {
//     childWindow = null
//   })
// }

app.on('ready', () => { createMainWindow(notesDataArray[0]); /*createAnotherWindow();*/ })

app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    clearPath(path.join(__dirname, 'html'))
    app.quit()
  }
})

app.on('activate', () => {
  if (notesDataArray[0].browserWindow === null) {
    createMainWindow(notesDataArray[0])
  }
})
