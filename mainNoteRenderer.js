const {
  handleCloseBtnClick,
  handleMinimizeBtnClick,
  handleNoteChange,
  handleAddBtnClick,
} = require('./functions');

const closeBtn = document.querySelector('.close-btn');
const minimizeBtn = document.querySelector('.minimize-btn');
const addBtn = document.querySelector('.add-btn');
const titleField = document.querySelector('.title-input');
const textField = document.querySelector('.note-area');

closeBtn.addEventListener('click', handleCloseBtnClick);
minimizeBtn.addEventListener('click', handleMinimizeBtnClick);
addBtn.addEventListener('click', handleAddBtnClick);
textField.addEventListener('input', handleNoteChange);
titleField.addEventListener('input', handleNoteChange);