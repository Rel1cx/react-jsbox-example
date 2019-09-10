import { html as jsx } from 'htm/react'
import { useImmer } from 'use-immer'
import invert from 'invert-color'
const { width, height } = $device.info.screen
export default function JsxLiteralExample() {
  const [color, updateColor] = useImmer({ R: 50, G: 75, B: 100 })
  const JSBoxColor = $rgb(color.R, color.G, color.B)
  return jsx`<view
      frame=${styles.container}
      bgcolor=${JSBoxColor}
  >
  <label
      frame=${styles.text}
      align=${$align.center}
      radius=${2}
      text=${JSBoxColor.hexCode}
      textColor=${JSBoxColor}
      bgcolor=${$color(invert(JSBoxColor.hexCode))}
  />
  ${Object.keys(color).map(
    (key, idx) => jsx`<slider
        key=${key}
        frame=${{
        ...styles.slider,
        y: width * 0.4 + 50 * idx
      }}
    value=${color[key]}
    min=${0}
    max=${255}
    events=${{
        changed(sender) {
          updateColor(draft => {
            draft[key] = Math.round(sender.value)
          })
        }
      }} />`
  )}
</view>`
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(width * 0.5 - 50, 64, 100, 30),
  slider: $rect(20, width * 0.4, width - 40, 50)
}
