import React from 'react'

const { width, height } = $device.info.screen

const html = $file.read('/report.html').string

export default function WebExample() {
    return <web frame={$rect(0, 0, width, width)} html={html} />
}
