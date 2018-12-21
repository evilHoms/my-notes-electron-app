const { app, ipcMain, Menu, Tray } = require('electron')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config();

const {
  getAllNotesIds,
  createNote,
  getNote,
  isPathExists,
  clearPath,
} = require('./fs-functions')
const { createMainNoteHtml, createChildNoteHtml } = require('./createHtml')
const { createNoteWindow } = require('./createWindows')

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
let tray = null;
app.on('ready', () => {
  const mainNote = notesDataArray.find((item) => (item.isMaster))
  notesDataArray.forEach((note) => {
    note.browserWindow = createNoteWindow(note, note.isMaster ? null : mainNote)

    note.isMaster && note.browserWindow.on('restore', () => {
      notesDataArray.forEach(note => {
        if (!note.isMaster) {
          note.browserWindow.minimize()
          note.browserWindow = createNoteWindow(note, mainNote)
        }
      })
    })

    tray = new Tray('./accets/images/note.png')
    const contextMenu = Menu.buildFromTemplate([
      {label: 'Item1', click() { console.log('1 click') }},
      {label: 'Item2', click() { console.log('2 click') }},
      {label: 'Item3', click() { console.log('3 click') }},
      {label: 'Item4', click() { console.log('4 click') }}
    ])
    tray.setToolTip('Notes.')
    tray.setContextMenu(contextMenu)
  })
})

app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    clearPath(path.join(__dirname, 'html'))
    tray = null
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
