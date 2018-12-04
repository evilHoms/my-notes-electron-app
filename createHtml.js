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
      </head>
      <body>
        <section id="root" data-id="${id}" data-type="parent">
          <header class="top-panel">
            <input class="title-input" value="${title}" data-id="${id}" data-type="title" />
            <button class="menu-btn"></button>
            <div class="menu-wrapper">
              <nav class="menu">
                <button class="add-btn">add note</button>
                <button class="close-btn">x</button>
                <button class="minimize-btn">-</button>
              </nav>
            </div>
          </header>
          <textarea class="note-area" data-id="${id}" data-type="note">${note}</textarea>
        </section>
        <script>
          require('../mainNoteRenderer.js')
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
          <header class="top-panel">
            <input class="title-input" value="${title}" data-id="${id}" data-type="title" />
            <button class="menu-btn"></button>
            <div class="menu-wrapper">
              <nav class="menu">
                <button class="close-btn">x</button>
                <button class="minimize-btn">-</button>
              </nav>
            </div>
          </header>
          <textarea class="note-area" data-id="${id}" data-type="note">${note}</textarea>
        </section>
        <script>
          require('../mainNoteRenderer.js')
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