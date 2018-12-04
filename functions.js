const { ipcRenderer, remote } = require('electron')
const { getNotePromise, writeNote, createNote } = require('./fs-functions')
const { createNoteWindow } = require('./createWindows')
const { createChildNoteHtml } = require('./createHtml')

const debounce = (func, delay) => {
  let timer = null;
  return (...props) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...props), delay)
  }
}

const handleCloseBtnClick = () => {
  const window = remote.getCurrentWindow();
  window.close();
}

const handleMinimizeBtnClick = () => {
  const window = remote.getCurrentWindow();
  window.minimize();
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
};