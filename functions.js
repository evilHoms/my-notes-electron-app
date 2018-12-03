const remote = require('electron').remote
const { getNotePromise, writeNote } = require('./fs-functions')

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
  handleNoteChange,
  insertStyles,
};