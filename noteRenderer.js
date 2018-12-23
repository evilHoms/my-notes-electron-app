const {
  handleCloseBtnClick,
  handleNoteChange,
  handleAddBtnClick,
  handleConfigChange,
  relaunch,
} = require('./functions')

const { getConfig } = require('./config')

// Common
const root = document.querySelector('#root')
const closeBtn = document.querySelector('.close-btn')
const titleField = document.querySelector('.title-input')
const textField = document.querySelector('.note-area')

// Only in master note
const addBtn = document.querySelector('.add-btn')
const changeTitleFzInput = document.querySelector('.change-title-fz-input')
const changeTitleColorInput = document.querySelector('.change-title-color-input')
const changeTitleFfInput = document.querySelector('.change-title-ff-input')
const changeFzInput = document.querySelector('.change-fz-input')
const changeColorInput = document.querySelector('.change-color-input')
const changeFfInput = document.querySelector('.change-ff-input')
const changePathInput = document.querySelector('.change-path-input')
const menuRelaunchBtn = document.querySelector('.menu-relaunch')
const changeBackgroundInput = document.querySelector('.change-background-input')
const changeMenuBackgroundInput = document.querySelector('.change-menu-background-input')

// Common
closeBtn.addEventListener('click', (e) => handleCloseBtnClick(e, root.dataset.id))
textField.addEventListener('input', handleNoteChange)
titleField.addEventListener('input', handleNoteChange)

// Only in master note
addBtn && addBtn.addEventListener('click', handleAddBtnClick)
changeFzInput && changeFzInput.addEventListener('input', handleConfigChange)
changeFfInput && changeFfInput.addEventListener('input', handleConfigChange)
changeColorInput && changeColorInput.addEventListener('input', handleConfigChange)
changeTitleColorInput && changeTitleColorInput.addEventListener('input', handleConfigChange)
changeTitleFzInput && changeTitleFzInput.addEventListener('input', handleConfigChange)
changeTitleFfInput && changeTitleFfInput.addEventListener('input', handleConfigChange)
changePathInput && changePathInput.addEventListener('input', handleConfigChange)
changeBackgroundInput && changeBackgroundInput.addEventListener('input', handleConfigChange)
changeMenuBackgroundInput && changeMenuBackgroundInput.addEventListener('input', handleConfigChange)
menuRelaunchBtn && menuRelaunchBtn.addEventListener('click', relaunch)

const config = getConfig()
changeTitleFfInput && (changeTitleFfInput.value = config.titleFontFamily)
changeTitleColorInput && (changeTitleColorInput.value = config.titleFontColor)
changeTitleFzInput && (changeTitleFzInput.value = config.titleFontSize)
changeFfInput && (changeFfInput.value = config.fontFamily)
changeColorInput && (changeColorInput.value = config.fontColor)
changeFzInput && (changeFzInput.value = config.fontSize)
changePathInput && (changePathInput.value = config.notesPath)
changeBackgroundInput && (changeBackgroundInput.value = config.background)
changeMenuBackgroundInput && (changeMenuBackgroundInput.value = config.menuBackground)

// Scroll input fields with possible big absolute path to end of line
changePathInput.scrollLeft = changePathInput.scrollWidth;
changeBackgroundInput.scrollLeft = changeBackgroundInput.scrollWidth;
changeMenuBackgroundInput.scrollLeft = changeMenuBackgroundInput.scrollWidth;
