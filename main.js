const { app, ipcMain, Menu, Tray } = require('electron')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config();
const {
  getAllNotesIds,
  createNote,
  getNote,
  isPathExists,
  folder__dirname,
  clearPath,
} = require('./fs-functions')
const { createMainNoteHtml, createChildNoteHtml } = require('./createHtml')
const { createNoteWindow } = require('./createWindows')

clearPath(path.join(folder__dirname, 'html'))

const notesPath = path.join(folder__dirname, 'data', 'notes')
const notesIdsArray = getAllNotesIds(notesPath)
global.notesDataArray = []

if (notesIdsArray.length) {
  notesIdsArray.forEach((noteId, index) => {
    const note = getNote(noteId)
    notesDataArray.push(note)
    if (!isPathExists(path.join(folder__dirname, `html/${noteId}.html`))) {
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
global.tray = null;
app.on('ready', () => {
  tray = new Tray(path.join(folder__dirname, 'accets', 'images', 'note.png'))
  const notesTrayItems = notesDataArray.map(note => ({
    label: note.title,
    click: () => {
      note.browserWindow.show()
      note.browserWindow.focus()
    }
  }))
  const trayExitBtn = [{
    type: 'separator'
  }, {
    label: 'Quit',
    click: () => {
      app.quit()
    }
  }]
  const mergedMenuItems = notesTrayItems.concat(trayExitBtn)
  const contextMenu = Menu.buildFromTemplate(mergedMenuItems)
  tray.setToolTip('Notes')
  tray.setContextMenu(contextMenu)

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
  })
})

app.on('window-all-closed',  () => {
  if (process.platform !== 'darwin') {
    clearPath(path.join(folder__dirname, 'html'))
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
