const {
  handleCloseBtnClick,
  handleMinimizeBtnClick,
  handleNoteChange,
} = require('./functions');

const root = document.querySelector('#root');
const closeBtn = document.querySelector('.close-btn');
const minimizeBtn = document.querySelector('.minimize-btn');
const titleField = document.querySelector('.title-input');
const textField = document.querySelector('.note-area');

closeBtn.addEventListener('click', handleCloseBtnClick);
minimizeBtn.addEventListener('click', handleMinimizeBtnClick);
textField.addEventListener('input', handleNoteChange);
titleField.addEventListener('input', handleNoteChange);