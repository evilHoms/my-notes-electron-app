const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

const getInstallerConfig = () => {
  console.log('creating windows installer')
  const rootPath = path.join('./')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'build'),
    authors: 'iTsiva',
    noMsi: true,
    outputDirectory: path.join(rootPath),
    exe: 'my-notes.exe',
    setupExe: 'MyNotesInstaller.exe',
    setupIcon: path.join(rootPath, '..', '..', 'accets', 'images', 'note.png')
  })
}

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })
