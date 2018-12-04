const { app, ipcMain } = require('electron')
const dotenv = require('dotenv')
const path = require('path')

const {
  getAllNotesIds,
  createNote,
  getNote,
  isPathExists,
  clearPath,
} = require('./fs-functions')
const { createMainNoteHtml, createChildNoteHtml } = require('./createHtml')
const { createNoteWindow } = require('./createWindows')

dotenv.config();
clearPath(path.join(__dirname, 'html'))

const notesPath = path.join(__dirname, process.env.NOTES_PATH)
const notesIdsArray = getAllNotesIds(notesPath)
global.notesDataArray = []

if (notesIdsArray.length) {
  notesIdsArray.forEach((noteId, index) => {
    const note = getNote(noteId)
    notesDataArray.push(note)
    if (!isPathExists(path.join(__dirname, `html/${noteId}.html`))) {
      note.isMaster ?
        createMainNoteHtml(notesDataArray[index]) :
        createChildNoteHtml(notesDataArray[index])
    } 
  })
} else {
  const newNote = createNote(true);
  notesDataArray.push(newNote)
  notesIdsArray.push(newNote.id)
  createMainNoteHtml(notesDataArray[0])
}

ipcMain.on( "setNotesDataArray", ( event, notesDataArray ) => {
  global.notesDataArray = notesDataArray;
} );

app.on('ready', () => {
  const mainNote = notesDataArray.find((item) => (item.isMaster))
  notesDataArray.forEach((note) => {
    note.browserWindow = createNoteWindow(note, note.isMaster ? null : mainNote)
  })
})

app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    clearPath(path.join(__dirname, 'html'))
    app.quit()
  }
})

app.on('activate', () => {
  const mainNote = notesDataArray.find((item) => (item.isMaster))
  if (mainNote.browserWindow === null) {
    notesDataArray.forEach((note) => {
      note.browserWindow = createNoteWindow(note, note.isMaster ? null : mainNote)
    })
  }
})
