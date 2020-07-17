import { createStore } from 'use-simple-store'

export const initialSettings = {
  enableReactProfiler: false,
  enableHighlightUpdates: false
}

export const settingsStore = createStore(
  $cache.get('settingsStore') || initialSettings
)

settingsStore.subscribe(state => {
  global.__REACT_JSBOX_HIGHLIGHT_UPDATES__ = state.enableHighlightUpdates
  $cache.set('settingsStore', state)
})
