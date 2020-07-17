import React from 'react'

const html = $file.read('/report.html').string

export default function WebViewExample(props) {
  return <web {...props} html={html} />
}
