const path = require('path')
const fs = require('fs')

const ensureStoreExists = () => {
  const storePath = path.join(__dirname, 'store.json')
  if (!fs.existsSync(storePath)) {
    const baseConfig = JSON.stringify({
      notesPath: process.env.NOTES_PATH,
      noteWidth: process.env.NOTE_WIDTH,
      noteHeight: process.env.NOTE_HEIGHT,
    })
    fs.writeFileSync(storePath, baseConfig)
  }
}

const writeStore = (data) => {
  fs.writeFile(path.join(__dirname, 'store.json'), JSON.stringify(data), (err) => {
    if (err) throw err
  });
}

ensureStoreExists()

const store = require('./store.json')
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