import React from 'react'
import ejs from 'ejs'
const { width, height } = $device.info.screen
const HLTemplate = $file.read('assets/prism.html').string
export default function CodeView(props) {
  const { content } = props
  const html = ejs.render(HLTemplate, { code: content })
  return <web frame={$rect(0, 0, width, width)} html={html} />
}
