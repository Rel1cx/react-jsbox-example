import React, { useMemo } from 'react'
import pupa from 'pupa'

const { width } = $device.info.screen

const HLTemplate = $file.read('assets/prism.html').string

export default function CodeView(props) {
    const { content } = props
    const html = useMemo(() => pupa(HLTemplate, { code: content }), [content])

    return <web frame={$rect(0, 0, width, width)} html={html} />
}
