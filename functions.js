const { ipcRenderer, remote } = require('electron')
const path = require('path')
const {
  getNotePromise,
  writeNote,
  createNote,
  removeFile,
  clearPath,
} = require('./fs-functions')
const { createNoteWindow } = require('./createWindows')
const { createChildNoteHtml } = require('./createHtml')

const debounce = (func, delay) => {
  let timer = null;
  return (...props) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...props), delay)
  }
}

const handleCloseBtnClick = (e, noteId) => {
  getNotePromise(noteId)
    .then(data => {
      if (data.isMaster) {
        clearPath(path.join(__dirname, 'html'))
        remote.app.quit();
      } else {
        removeFile(path.join(__dirname, `html/${noteId}.html`))
        removeFile(path.join(__dirname, `data/notes/${noteId}.json`))
        const window = remote.getCurrentWindow()
        window.close()
      }
    })
    .catch(err => { throw new Error(err) })
}

const handleMinimizeBtnClick = () => {
  const window = remote.getCurrentWindow();
  window.minimize()
}

const handleAddBtnClick = () => {
  const isRemote = true
  const newNote = createNote();
  const notesDataArray = remote.getGlobal( "notesDataArray" )
  //console.log(notesDataArray)
  const mainNote = notesDataArray.find((item) => (item.isMaster))
  createChildNoteHtml(newNote)
  newNote.browserWindow = createNoteWindow(newNote, mainNote, isRemote)
  notesDataArray.push(newNote)
  ipcRenderer.send( "setNotesDataArray", notesDataArray );
}

const handleNoteChange = debounce((e) => {
  getNotePromise(e.target.dataset.id)
    .then(data => {
      data[e.target.dataset.type] = e.target.value
      return data
    })
    .then(updatedData => writeNote(updatedData))
    .catch(err => { throw err })
}, 2000)

const insertStyles = styles => {
  const head = document.head
  const style = document.createElement('style')
  style.innerHTML = styles
  head.appendChild(style)
}

module.exports = {
  handleCloseBtnClick,
  handleMinimizeBtnClick,
  handleAddBtnClick,
  handleNoteChange,
  insertStyles,
  debounce,
};