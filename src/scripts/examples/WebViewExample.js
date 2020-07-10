import React from 'react'

const { width } = $ui.vc.view.frame

const html = $file.read('/report.html').string

export default function WebViewExample() {
  return <web frame={$rect(0, 0, width, width)} html={html} />
}
