const {
  handleCloseBtnClick,
  handleMinimizeBtnClick,
  handleNoteChange,
  handleAddBtnClick,
} = require('./functions')

const root = document.querySelector('#root')
const closeBtn = document.querySelector('.close-btn')
const minimizeBtn = document.querySelector('.minimize-btn')
const addBtn = document.querySelector('.add-btn')
const titleField = document.querySelector('.title-input')
const textField = document.querySelector('.note-area')


closeBtn.addEventListener('click', (e) => handleCloseBtnClick(e, root.dataset.id))
minimizeBtn.addEventListener('click', handleMinimizeBtnClick)
addBtn && addBtn.addEventListener('click', handleAddBtnClick)
textField.addEventListener('input', handleNoteChange)
titleField.addEventListener('input', handleNoteChange)