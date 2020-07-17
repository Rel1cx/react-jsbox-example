import React, { Profiler } from 'react'
import { settingsStore } from '../store'

export default function CustomProfiler({ children, ...rest }) {
  const enableReactProfiler = settingsStore.useStore(s => s.enableReactProfiler)
  if (!enableReactProfiler) {
    return children
  }
  return <Profiler {...rest}>{children}</Profiler>
}
