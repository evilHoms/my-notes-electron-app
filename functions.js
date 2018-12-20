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
const { getConfig, setConfig } = require('./config')

const debounce = (func, delay) => {
  let timer = null;
  return (...props) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => func(...props), delay)
  }
}

const isBackgroundColor = (value) => {
  return value[0] === '#' || !value.split('').find(item => (item === '.' || item === '/'))
}

const kebabToCamelCase = (str) => {
  return str.split('-').map((item, index) => (
    index > 0 ? item[0].toUpperCase() + item.slice(1) : item )).join('')
}

const handleCloseBtnClick = (e, noteId) => {
  getNotePromise(noteId)
    .then(data => {
      if (data.isMaster) {
        clearPath(path.join(__dirname, 'html'))
        remote.app.quit();
      } else {
        removeFile(path.join(__dirname, `html/${noteId}.html`))
        removeFile(`${getConfig().notesPath}/${noteId}.json`)
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
  const mainNote = notesDataArray.find((item) => (item.isMaster))
  createChildNoteHtml(newNote)
  newNote.browserWindow = createNoteWindow(newNote, mainNote, isRemote)
  notesDataArray.push(newNote)
  ipcRenderer.send( "setNotesDataArray", notesDataArray );
}

const handleNoteChange = debounce(e => {
  getNotePromise(e.target.dataset.id)
    .then(data => {
      data[e.target.dataset.type] = e.target.value
      return data
    })
    .then(updatedData => writeNote(updatedData))
    .catch(err => { throw err })
}, 200)

const insertStyles = styles => {
  const head = document.head
  const style = document.createElement('style')
  style.innerHTML = styles
  head.appendChild(style)
}

const handleConfigChange = debounce(e => {
  const storedFieldName = kebabToCamelCase(e.target.dataset.type)
  applyOptionChange(e.target.dataset.type, e.target.value)
  setConfig({ [storedFieldName]: e.target.value })
}, 1000)

const relaunch = () => {
  remote.app.relaunch()
  remote.app.exit()
}

const applyOptionChange = (field, change) => {
  switch (field) {
    case 'font-size': {
      const element = document.querySelector('[data-type="note"]')
      element.style.fontSize = change
      break
    }
    case 'title-font-size': {
      const element = document.querySelector('[data-type="title"]')
      element.style.fontSize = change
      break
    }
    case 'font-color': {
      const element = document.querySelector('[data-type="note"]')
      element.style.color = change
      break
    }
    case 'title-font-color': {
      const element = document.querySelector('[data-type="title"]')
      element.style.color = change
      break
    }
    case 'font-family': {
      const element = document.querySelector('[data-type="note"]')
      element.style.fontFamily = change
      break
    }
    case 'title-font-family': {
      const element = document.querySelector('[data-type="title"]')
      element.style.fontFamily = change
      break
    }
    case 'background': {
      const element = document.querySelector('[data-type="face"]')
      if (isBackgroundColor(change)) {
        element.style.backgroundColor = change
        element.style.backgroundImage = 'none'
      } else {
        element.style.backgroundColor = '#ffffff'
        element.style.backgroundImage = `url(${change})`
      }
      break
    }
    case 'menu-background': {
      const element = document.querySelector('[data-type="menu"]')
      if (isBackgroundColor(change)) {
        element.style.backgroundColor = change
        element.style.backgroundImage = 'none'
      } else {
        element.style.backgroundColor = '#ffffff'
        element.style.backgroundImage = `url(${change})`
      }
      break
    }
  }
}

module.exports = {
  handleCloseBtnClick,
  handleMinimizeBtnClick,
  handleConfigChange,
  handleAddBtnClick,
  handleNoteChange,
  insertStyles,
  debounce,
  relaunch,
};