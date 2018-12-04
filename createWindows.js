const { BrowserWindow, remote } = require('electron')
const { removeFile } = require('./fs-functions')

const createNoteWindow = (noteItem, parentNoteItem = null, isRemote = false) => {
  const { id } = noteItem
  const CheckedBrowserWindow = isRemote ? remote.BrowserWindow : BrowserWindow
  const browserWindow = new CheckedBrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    parent: parentNoteItem,
    // TODO add resize, save window size and position on screen
    resizable: false,
  })

  browserWindow.loadFile(`html/${id}.html`)

  // closed not working
  browserWindow.on('closed', () => {
    // TODO close all windows, when master mindow closes
    // removeFile(path.join(__dirname, `html/${id}.html`))
    // removeFile(path.join(__dirname, `data/notes/${id}.json`))
    browserWindow = null
  })

  return browserWindow
}

module.exports = {
  createNoteWindow,
}