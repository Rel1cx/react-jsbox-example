import React, { Profiler } from 'react'

export default function CustomProfiler({ enable = false, children, ...rest }) {
  if (!enable) {
    return children
  }
  return <Profiler {...rest}>{children}</Profiler>
}
