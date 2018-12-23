const fs = require('fs')
const path = require('path')

const config = require('./config').getConfig()

const isBackgroundColor = (value) => {
  return value[0] === '#' || !value.split('').find(item => (item === '.' || item === '/'))
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
            data-type="face"
            style="
              background-image: ${isBackgroundColor(config.background) ? 'none' : `url(${config.background})`};
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
              class="note-area custom-scroll"
              style="
                color: ${config.fontColor};
                font-size: ${config.fontSize};
                font-family: ${config.fontFamily};
              "
              data-id="${id}"
              data-type="note">${note}</textarea>
          </div>
          <div class="master-menu-wrapper">
            <div
              class="master-note-menu"
              data-type="menu"
              style="
                background-image: ${isBackgroundColor(config.menuBackground) ? 'none' : `url(${config.menuBackground})`};
                background-color: ${isBackgroundColor(config.menuBackground) ? config.menuBackground : '#ffffff'};
              ">
              <nav class="menu">
                <div class="menu-controls">
                  <button class="add-btn">
                    +
                  </button>
                  <div class="menu-hint">
                    Add one more note.
                  </div>
                  <button class="close-btn">
                    X
                  </button>
                  <div class="menu-hint">
                    Close application (All notes will be saved).
                  </div>
                </div>
                <div class="menu-options custom-scroll">
                  <label>
                    <span class="menu-input-title">Titles Font Size:</span>
                    <div class="menu-hint">
                      Edit size of font for title in all notes.
                    </div>
                    <input class="change-title-fz-input" placeholder="Titles font size" data-type="title-font-size" />
                  </label>
                  <label>
                    <span class="menu-input-title">Titles Font Color:</span>
                    <div class="menu-hint">
                      Edit color of font for title in all notes.
                    </div>
                    <input class="change-title-color-input" placeholder="Titles font color" data-type="title-font-color" />
                  </label>
                  <label>
                    <span class="menu-input-title">Titles Font Family:</span>
                    <div class="menu-hint">
                      Edit family of font for title in all notes.
                    </div>
                    <select class="change-title-ff-input" data-type="title-font-family">
                      <option value="Caveat">Caveat</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Merriweather">Merriweather</option>
                    </select>
                  </label>
                  <label>
                    <span class="menu-input-title">Font Size:</span>
                    <div class="menu-hint">
                      Edit size of note's text in all notes.
                    </div>
                    <input class="change-fz-input" placeholder="Notes font size" data-type="font-size" />
                  </label>
                  <label>
                    <span class="menu-input-title">Font Color:</span>
                    <div class="menu-hint">
                      Edit color of note's text in all notes.
                    </div>
                    <input class="change-color-input" placeholder="Titles font color" data-type="font-color" />
                  </label>
                  <label>
                    <span class="menu-input-title">Font Family:</span>
                    <div class="menu-hint">
                      Edit font family of note's text in all notes.
                    </div>
                    <select class="change-ff-input" data-type="font-family">
                      <option value="Caveat">Caveat</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Merriweather">Merriweather</option>
                    </select>
                  </label>
                  <label>
                    <span class="menu-input-title">Background:</span>
                    <div class="menu-hint">
                      Edit note's background in all notes. You can use hex colors (#ffffff for white, etc),
                      common words (white, black, red, etc) or images, using absolute path, or path relative
                      to app's root.
                    </div>
                    <input class="change-background-input" placeholder="Background" data-type="background" />
                  </label>
                  <label>
                    <span class="menu-input-title">Menu Background:</span>
                    <div class="menu-hint">
                      Edit note's menu background in main note. You can use hex colors (#ffffff for white, etc),
                      common words (white, black, red, etc) or images, using absolute path, or path relative
                      to app's root.
                    </div>
                    <input class="change-menu-background-input" placeholder="Menu Background" data-type="menu-background" />
                  </label>
                  <label>
                    <span class="menu-input-title">Notes path:</span>
                    <div class="menu-hint">
                      Edit path to store notes info. Default is app's root + data/notes path. Can be changed to have
                      access for same notes in different OS in one machine.
                    </div>
                    <input class="change-path-input" placeholder="Notes path" data-type="notes-path" />
                  </label>
                </div>
                <div>
                  Press <button class="menu-relaunch">Relaunch</button> to apply changes for all notes
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
            background-image: ${isBackgroundColor(config.background) ? 'none' : `url(${config.background})`};
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
              class="note-area custom-scroll"
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