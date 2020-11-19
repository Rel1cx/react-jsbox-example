import React, { useRef, useEffect } from 'react'
import { useProxy } from 'valtio'
import { globalState } from '../store'
import { noop } from '../helper'
import { initialSettingsState } from '../constants'

const Settings = props => {
  const settingsRef = useRef()
  const settings = useProxy(globalState.settings)

  useEffect(() => {
    global.__REACT_JSBOX_HIGHLIGHT_UPDATES__ = settings.enableHighlightUpdates
  }, [settings.enableHighlightUpdates])

  return (
    <view {...props}>
      <list
        id="settings"
        ref={settingsRef}
        frame={props.frame}
        template={{
          props: {
            accessoryType: 1
          },
          views: [
            {
              type: 'label',
              props: {
                id: 'setup',
                textColor: $color('darkGray')
              },
              layout(make, view) {
                make.centerY.equalTo(view.super)
                make.left.inset(15)
              }
            },
            {
              type: 'label',
              props: {
                id: 'value',
                textColor: $color('#333')
              },
              layout(make, view) {
                make.centerY.equalTo(view.super)
                make.right.inset(5)
              }
            }
          ]
        }}
        data={[
          {
            title: 'Profiler',
            rows: [
              {
                type: 'views',
                layout: $layout.fill,
                views: [
                  {
                    type: 'label',
                    props: {
                      id: 'setup',
                      text: 'Enable React Profiler',
                      textColor: $color('darkGray')
                    },
                    layout(make, view) {
                      make.centerY.equalTo(view.super)
                      make.left.inset(15)
                    }
                  },
                  {
                    type: 'switch',
                    props: {
                      on: settings.enableReactProfiler,
                      tintColor: $color('dark')
                    },
                    layout(make, view) {
                      make.centerY.equalTo(view.super)
                      make.right.inset(15)
                    },
                    events: {
                      changed(sender) {
                        globalState.settings.enableReactProfiler = sender.on
                        $audio.play({
                          id: 1104
                        })
                      }
                    }
                  }
                ]
              },
              {
                type: 'views',
                layout: $layout.fill,
                views: [
                  {
                    type: 'label',
                    props: {
                      id: 'setup',
                      text: 'Enable Highlight Updates',
                      textColor: $color('darkGray')
                    },
                    layout(make, view) {
                      make.centerY.equalTo(view.super)
                      make.left.inset(15)
                    }
                  },
                  {
                    type: 'switch',
                    props: {
                      on: settings.enableHighlightUpdates,
                      tintColor: $color('dark')
                    },
                    layout(make, view) {
                      make.centerY.equalTo(view.super)
                      make.right.inset(15)
                    },
                    events: {
                      changed(sender) {
                        globalState.settings.enableHighlightUpdates = sender.on
                        $audio.play({
                          id: 1104
                        })
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            title: 'Misc',
            rows: [
              {
                setup: {
                  text: 'Restore default settings'
                },
                value: {
                  text: ''
                }
              }
            ]
          }
        ]}
        events={{
          didSelect(sender, { row, section }) {
            actions[Object.keys(actions)[section]][row](sender)
          }
        }}
      />
    </view>
  )
}

const actions = {
  profiler: [noop, noop],
  misc: [
    () => {
      globalState.settings = initialSettingsState
      // settingsStore.update(() => initialSettings)
      // prettier-ignore
      // sender.cell($indexPath(0, 0)).get('switch').on = initialSettings.enableReactProfiler
      // prettier-ignore
      // sender.cell($indexPath(0, 1)).get('switch').on = initialSettings.enableHighlightUpdates
    }
  ]
}

export default Settings
