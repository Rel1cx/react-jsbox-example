import React, { useReducer } from 'react'
import { listTemplate } from '../constants'
const { width, height } = $device.info.screen

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, count: state.count + 1 }
    case 'DECREASE':
      return { ...state, count: state.count - 1 }
    case 'RESET':
      return { ...state, count: 0 }
    default:
      throw new Error()
  }
}

export default function ReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0
  })
  return (
    <view frame={styles.container}>
      <label
        frame={styles.text}
        align={$align.center}
        font={$font(26)}
        text={String(state.count)}
        autoFontSize
      />
      <list
        frame={styles.list}
        scrollEnabled={false}
        radius={5}
        bgcolor={$color('#ededed')}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, indexPath, data) => dispatch({ type: data })
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(0, 64, width, 30),
  list: $rect(0, width * 0.5, width, 132)
}
