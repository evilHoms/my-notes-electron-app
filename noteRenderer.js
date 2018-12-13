const {
  handleCloseBtnClick,
  handleNoteChange,
  handleAddBtnClick,
  handleConfigChange,
} = require('./functions')

// Common
const root = document.querySelector('#root')
const closeBtn = document.querySelector('.close-btn')
const titleField = document.querySelector('.title-input')
const textField = document.querySelector('.note-area')

// Only in master note
const addBtn = document.querySelector('.add-btn')
const changeFzInput = document.querySelector('.change-fz-input')
const changeFfInput = document.querySelector('.change-ff-input')
const changePathInput = document.querySelector('.change-path-input')

// Common
closeBtn.addEventListener('click', (e) => handleCloseBtnClick(e, root.dataset.id))
textField.addEventListener('input', handleNoteChange)
titleField.addEventListener('input', handleNoteChange)

// Only in master note
console.log(changeFzInput)
addBtn && addBtn.addEventListener('click', handleAddBtnClick)
changeFzInput && changeFzInput.addEventListener('input', handleConfigChange)
changeFfInput && changeFfInput.addEventListener('input', handleConfigChange)
changePathInput && changePathInput.addEventListener('input', handleConfigChange)