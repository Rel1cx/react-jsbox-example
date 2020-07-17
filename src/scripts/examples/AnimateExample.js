import React, { useMemo, useState } from 'react'
import { UIViewAnimationOption } from '../constants'

const theme = {
  light: {
    backgroundColor: '#F4F4F4',
    moonShadowOffset: 0
  },
  dark: {
    backgroundColor: '#222222',
    moonShadowOffset: 100
  }
}

export default function AnimateExample(props) {
  const { width, height } = props.frame
  const [mode, setMode] = useState('light')
  const viewProps = theme[mode]

  const styles = useMemo(
    () => ({
      sun: $rect(width * 0.5 - 80, width * 0.5 - 80, 160, 160)
    }),
    [width, height]
  )

  return (
    <view
      bgcolor={$color(viewProps.backgroundColor)}
      animate={{
        duration: 0.4,
        delay: 0.2,
        options:
          UIViewAnimationOption.CurveEaseInOut |
          UIViewAnimationOption.AllowUserInteraction,
        completion() {
          $device.taptic()
        }
      }}
      {...props}
    >
      <view
        id="sun"
        frame={styles.sun}
        radius={80}
        bgcolor={$color('#FF7')}
        borderWidth={8}
        borderColor={$color('#777')}
        events={{
          tapped() {
            setMode(x => (x === 'light' ? 'dark' : 'light'))
          }
        }}
      >
        <view
          id="moon-shadow"
          radius={80}
          frame={{
            x: 160 - viewProps.moonShadowOffset,
            y: 0,
            width: 160,
            height: 160
          }}
          bgcolor={$color('#000')}
          animate={{
            duration: 0.4,
            options: UIViewAnimationOption.AllowUserInteraction
          }}
        />
      </view>
    </view>
  )
}
