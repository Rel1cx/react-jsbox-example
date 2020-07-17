import React, { memo, useMemo } from 'react'
import pupa from 'pupa'

const HLTemplate = $file.read('assets/prism.html').string

function CodeView({ content, ...rest }) {
  const html = useMemo(() => pupa(HLTemplate, { code: content }), [content])

  return <web html={html} {...rest} />
}

export default memo(CodeView)
