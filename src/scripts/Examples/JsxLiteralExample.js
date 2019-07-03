import { html as jsx } from 'htm/react'
import React, { useState } from 'react'
import ReactJSBox from 'react-jsbox'
import { listTemplate } from '../constants'
const { width, height } = $device.info.screen

export default function JsxLiteralExample() {
  const [count, setCount] = useState(0)
  return jsx`<view frame=${styles.container}>
      <label
        frame=${styles.text}
        align=${$align.center}
        font=${$font('ArialRoundedMTBold', 26)}
        text=${String(count)}
        autoFontSize=${true}
      />
      <list
        frame=${styles.list}
        scrollEnabled=${false}
        radius=${5}
        bgcolor=${$color('#ededed')}
        data=${['INCREASE', 'DECREASE', 'RESET']}
        template=${listTemplate}
        events=${{
          didSelect: (sender, { row }, data) => setCount(count => count + [1, -1, -count][row])
        }}
      />
    </view>`
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(0, 64, width, 30),
  list: $rect(0, width * 0.5, width, 132)
}
