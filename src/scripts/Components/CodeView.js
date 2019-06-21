import React from 'react'
const { width, height } = $device.info.screen
export default function CodeView(props) {
  const code = props.content.replace(/[\u00A0-\u9999<>&]/gim, i => `&#${i.charCodeAt(0)};`)
  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="user-scalable=no" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/styles/agate.min.css" />
      <style>
        * {
          margin: 0;
          padding: 0;
        }
        code,
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          font-size: 1.2rem;
          line-height: 24px;
        }
      </style>
    </head>
    <body class="hljs">
      <pre><code class="hljs">${code}</code></pre>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.8/highlight.min.js"></script>
      <script>
        hljs.initHighlightingOnLoad()
      </script>
    </body>
  </html>
  `
  return <web frame={$rect(0, 0, width, width)} html={html} />
}
