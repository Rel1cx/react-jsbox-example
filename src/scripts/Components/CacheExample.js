import React from 'react'
import ReactJSBox from 'react-jsbox'
const { width, height } = $device.info.screen

export default function App() {
  const [count, setCount] = ReactJSBox.useCache('count', 0)
  const listTemplate = {
    views: [
      {
        type: 'label',
        props: {
          bgcolor: $color('#474b51'),
          textColor: $color('#abb2bf'),
          align: $align.center,
          font: $font('iosevka', 24)
        },
        layout: $layout.fill
      }
    ]
  }

  return (
    <view frame={styles.container}>
      <label
        frame={styles.text}
        align={$align.center}
        font={$font('ArialRoundedMTBold', 26)}
        text={String(count)}
        autoFontSize={true}
      />
      <list
        frame={styles.list}
        scrollEnabled={false}
        radius={5}
        bgcolor={$color('#ededed')}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, { row }, data) => setCount(count => count + [1, -1, -count][row])
        }}
      />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30),
  list: $rect(0, (height - 40) * 0.3, width, 132)
}
