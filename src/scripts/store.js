import { proxy, subscribe } from 'valtio'
import { initialSettingsState } from './constants'

export const globalState = proxy({
  count: 0,
  settings: $cache.get('settingsStore') || initialSettingsState
})

subscribe(globalState.settings, () => {
  $cache.set('settingsStore', globalState.settings)
})
