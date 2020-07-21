import { createStore } from 'use-simple-store'

export const initialSettings = {
  enableReactProfiler: false,
  enableHighlightUpdates: false
}

export const settingsStore = createStore(
  $cache.get('settingsStore') || initialSettings
)

settingsStore.subscribe(state => $cache.set('settingsStore', state))
