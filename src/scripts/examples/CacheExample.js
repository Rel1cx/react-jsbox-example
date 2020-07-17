import React, { useMemo } from 'react'
import { useCache } from 'react-jsbox'
import { listTemplate } from '../constants'

export default function CacheExample(props) {
  const { width } = props.frame
  const [count, setCount] = useCache('count', 0)

  const styles = useMemo(
    () => ({
      text: $rect(0, 64, width, 30),
      list: $rect(0, width * 0.5 - 15, width, 132)
    }),
    [width]
  )

  return (
    <view {...props}>
      <label
        frame={styles.text}
        align={$align.center}
        font={$font(26)}
        text={String(count)}
        autoFontSize
      />
      <list
        frame={styles.list}
        scrollEnabled={false}
        radius={5}
        data={['INCREASE', 'DECREASE', 'RESET']}
        template={listTemplate}
        events={{
          didSelect: (sender, { row }, data) =>
            setCount(count => count + [1, -1, -count][row])
        }}
      />
    </view>
  )
}
