import React from 'react'
const { width, height } = $device.info.screen
export default function CodeView(props) {
  const code = props.content.replace(/[\u00A0-\u9999<>&]/gim, i => `&#${i.charCodeAt(0)};`)
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="user-scalable=no" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/themes/prism-tomorrow.css" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/prismjs@1.15.0/plugins/line-numbers/prism-line-numbers.min.css"
      />
      <title>Code</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        body {
          background: #2d2d2d;
        }
        #prism-pre,
        #prism-code {
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 1.25rem;
        }
      </style>
    </head>
    <body>
      <pre id="prism-pre" class="language-jsx"><code id="prism-code" class="language-jsx">${code}</code></pre>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/prism.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/components/prism-javascript.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/components/prism-jsx.min.js"></script>
      <script>
        Prism.highlightAll(true)
      </script>
    </body>
  </html>
  `
  return <web frame={$rect(0, 0, width, width)} html={html} />
}
