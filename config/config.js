const path = require('path')
const fs = require('fs')

const isExecutable = () => {
  if (__dirname.match('.asar')) {
    return true
  }
  return false
}

const folder__dirname = isExecutable() ? path.join(__dirname, '..', '..', '..') : path.join(__dirname, '..')

const ensureStoreExists = () => {
  const storePath = path.join(folder__dirname, 'store.json')
  if (!fs.existsSync(storePath)) {
    const baseConfig = JSON.stringify({
      notesPath: path.join(folder__dirname, 'data', 'notes'),
      noteWidth: process.env.NOTE_WIDTH,
      noteHeight: process.env.NOTE_HEIGHT,
      titleFontSize: '24px',
      titleFontColor: '#232327',
      titleFontFamily: 'Caveat',
      fontSize: '20px',
      fontColor: '#232327',
      fontFamily: 'Caveat',
      background: path.join(folder__dirname, 'accets/images/paper.jpg'),
      menuBackground: '#ffffff',
    })
    fs.writeFileSync(storePath, baseConfig)
  }
}

const writeStore = (data) => {
  fs.writeFile(path.join(folder__dirname, 'store.json'), JSON.stringify(data), (err) => {
    if (err) throw err
  });
}

ensureStoreExists()

const store = require('../store.json')
const config = { ...store }

const getConfig = () => {
  return { ...config }
}

const setConfig = (changes) => {
  Object.keys(changes).forEach(change => {
    config[change] = changes[change]
  })
  writeStore(config)
}

module.exports = { getConfig, setConfig }