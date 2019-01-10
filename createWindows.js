const electron = require('electron')
const { BrowserWindow, remote } = require('electron')
const path = require('path')

const config = require('./config').getConfig()
const { writeNote, folder__dirname } = require('./fs-functions')

const debounce = (func, delay) => {
  let timer = null;
  return (...props) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...props), delay)
  }
}

const createNoteWindow = (noteItem, parentNoteItem = null, isRemote = false) => {
  const updatedNoteItem = { ...noteItem }
  updatedNoteItem.browserWindow && delete updatedNoteItem.browserWindow
  const { id, isMaster, relativeX, relativeY, relativeWidth, relativeHeight } = noteItem
  const screen = electron.screen.getPrimaryDisplay().workAreaSize
  const defaultNoteWidth = parseInt(config.noteWidth)
  const defaultNoteHeight = parseInt(config.noteHeight)
  const throttledWriteNote = debounce((updatedNoteItem) => writeNote(updatedNoteItem), 1000)

  const x = relativeX ? screen.width * relativeX : null
  const y = relativeY ? screen.height * relativeY : null
  const width = relativeWidth ? screen.width * relativeWidth : defaultNoteWidth
  const height = relativeHeight ? screen.height * relativeHeight : defaultNoteHeight

  const CheckedBrowserWindow = isRemote ? remote.BrowserWindow : BrowserWindow
  const browserWindow = new CheckedBrowserWindow({
    parent: isMaster ? null : parentNoteItem,
    skipTaskbar: true,
    resizable: true,
    frame: false,
    height,
    width,
    x,
    y,
  })

  browserWindow.loadFile(path.join(folder__dirname, 'html', `${id}.html`))

  browserWindow.on('move', () => {
    const relativeX = browserWindow.getPosition()[0] / screen.width
    const relativeY = browserWindow.getPosition()[1] / screen.height
    updatedNoteItem.relativeX = relativeX
    updatedNoteItem.relativeY = relativeY
    throttledWriteNote(updatedNoteItem)
  })

  browserWindow.on('resize', () => {
    const relativeWidth = browserWindow.getSize()[0] / screen.width
    const relativeHeight = browserWindow.getSize()[1] / screen.height
    updatedNoteItem.relativeWidth = relativeWidth
    updatedNoteItem.relativeHeight = relativeHeight
    throttledWriteNote(updatedNoteItem)
  })
  
  browserWindow.webContents.openDevTools()
  return browserWindow
}

module.exports = {
  createNoteWindow,
}