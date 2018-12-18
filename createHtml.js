const fs = require('fs')
const path = require('path')

const config = require('./config').getConfig()

const isBackgroundColor = (value) => {
  if (value[0] === '#' || !value.split('').find(item => (item === '.' || item === '/'))) {
    console.log(value)
    console.log('true')
    return true
  }
  console.log(value)
  console.log('false')
  return false
}

const createMainNoteHtml = ({ id, title = 'Untitled', note = 'Enter note text here...' }) => {
  const mainNoteTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Notes</title>
        <link rel="stylesheet" href="../style.css">
        <link rel="stylesheet" href="../master-menu-style.css">
      </head>
      <body>
        <section id="root" data-id="${id}" data-type="parent">
          <div
            class="note-face"
            style="
              background-image: ${isBackgroundColor(config.background) ? null : `url(${config.background})`};
              background-color: ${isBackgroundColor(config.background) ? config.background : '#ffffff'};
            ">
            <header class="top-panel">
              <input
                class="title-input"
                style="
                  color: ${config.titleFontColor};
                  font-size: ${config.titleFontSize};
                  font-family: ${config.titleFontFamily};
                "
                value="${title}"
                data-id="${id}"
                data-type="title"
              />
            </header>
            <textarea
              class="note-area"
              style="
                color: ${config.fontColor};
                font-size: ${config.fontSize};
                font-family: ${config.fontFamily};
              "
              data-id="${id}"
              data-type="note">${note}</textarea>
          </div>
          <div class="master-menu-wrapper">
            <div class="master-note-menu">
              <nav class="menu">
                <div class="menu-controls">
                  <button class="add-btn">+</button>
                  <button class="close-btn">X</button>
                </div>
                <div class="menu-options">
                  <label>
                    <span class="menu-input-title">Titles Font Size</span>
                    <input class="change-title-fz-input" placeholder="Titles font size" data-type="title-font-size" />
                  </label>
                  <label>
                    <span class="menu-input-title">Titles Font Color</span>
                    <input class="change-title-color-input" placeholder="Titles font color" data-type="title-font-color" />
                    <div class="title-font-color-sample" style="background-color: ${config.titleFontColor}"></div>
                  </label>
                  <label>
                    <span class="menu-input-title">Titles Font Family</span>
                    <select class="change-title-ff-input" data-type="title-font-family">
                      <option value="Caveat">Caveat</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Merriweather">Merriweather</option>
                    </select>
                  </label>
                  <label>
                    <span class="menu-input-title">Font Size</span>
                    <input class="change-fz-input" placeholder="Notes font size" data-type="font-size" />
                  </label>
                  <label>
                    <span class="menu-input-title">Font Color</span>
                    <input class="change-color-input" placeholder="Titles font color" data-type="font-color" />
                    <div class="font-color-sample" style="background-color: ${config.fontColor}"></div>
                  </label>
                  <label>
                    <span class="menu-input-title">Font Family</span>
                    <select class="change-ff-input" data-type="font-family">
                      <option value="Caveat">Caveat</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Merriweather">Merriweather</option>
                    </select>
                  </label>
                  <label>
                    <span class="menu-input-title">Background</span>
                    <input class="change-background-input" placeholder="Background" data-type="background" />
                  </label>
                  <label>
                    <span class="menu-input-title">Notes path</span>
                    <input class="change-path-input" placeholder="Notes path" data-type="notes-path" />
                  </label>
                </div>
                <div>
                  Press <button class="menu-relaunch">Relaunch</button> to apply changes
                </div>
              </nav>
            </div>
          </div>
        </section>
        <script>
          require('../noteRenderer.js')
        </script>
      </body>
    </html> 
  `
  fs.writeFileSync(path.join(__dirname, `html/${id}.html`), mainNoteTemplate);
}

const createChildNoteHtml = ({ id, title = 'Untitled', note = 'Enter note text here...' }) => {
  const childNoteTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Notes</title>
        <link rel="stylesheet" href="../style.css">
      </head>
      <body>
        <section id="root" data-id="${id}" data-type="child">
        <div
          class="note-face"
          style="
            background-image: ${isBackgroundColor(config.background) ? null : `url(${config.background})`};
            background-color: ${isBackgroundColor(config.background) ? config.background : '#ffffff'};
          ">
            <header class="top-panel">
              <input
                class="title-input"
                style="
                  color: ${config.titleFontColor};
                  font-size: ${config.titleFontSize};
                  font-family: ${config.titleFontFamily};
                "
                value="${title}"
                data-id="${id}"
                data-type="title"
              />
              <div class="child-note-menu-wrapper">
                <button class="close-btn">X</button>
              </div>
            </header>
            <textarea
              class="note-area"
              style="
                color: ${config.fontColor};
                font-size: ${config.fontSize};
                font-family: ${config.fontFamily};
              "
              data-id="${id}"
              data-type="note">${note}</textarea>
          </div>
        </section>
        <script>
          require('../noteRenderer.js')
        </script>
      </body>
    </html> 
  `
  fs.writeFileSync(path.join(__dirname, `html/${id}.html`), childNoteTemplate);
}

module.exports = {
  createMainNoteHtml,
  createChildNoteHtml,
}