const fs = require('fs')
const path = require('path')

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
          <div class="note-face">
            <header class="top-panel">
              <input class="title-input" value="${title}" data-id="${id}" data-type="title" />
            </header>
            <textarea class="note-area" data-id="${id}" data-type="note">${note}</textarea>
          </div>
          <div class="master-menu-wrapper">
            <div class="master-note-menu">
              <nav class="menu">
                <button class="add-btn">add note</button>
                <button class="close-btn">X</button>
                <input class="change-fz-input" placeholder="Notes font size" data-type="font-size" />
                <input class="change-ff-input" placeholder="Notes font family" data-type="font-family" />
                <input class="change-path-input" placeholder="Notes path" data-type="notes-path" />
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
          <div class="note-face">
            <header class="top-panel">
              <input class="title-input" value="${title}" data-id="${id}" data-type="title" />
              <div class="child-note-menu-wrapper">
                <button class="close-btn">X</button>
              </div>
            </header>
            <textarea class="note-area" data-id="${id}" data-type="note">${note}</textarea>
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