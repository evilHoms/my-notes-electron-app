const { BrowserWindow, remote } = require('electron')

const createNoteWindow = (noteItem, parentNoteItem = null, isRemote = false) => {
  const { id } = noteItem
  console.log(remote ? remote.BrowserWindow : 'null')
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

  browserWindow.on('closed', () => {
    removeFile(path.join(__dirname, `html/${id}.html`))
    browserWindow = null
  })

  return browserWindow
}

module.exports = {
  createNoteWindow,
}