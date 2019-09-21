import React from 'react'
import pupa from 'pupa'

const { width } = $device.info.screen

const HLTemplate = $file.read('assets/prism.html').string

export default function CodeView(props) {
  const { content } = props

  const html = pupa(HLTemplate, { code: content })

  return <web frame={$rect(0, 0, width, width)} html={html} />
}
