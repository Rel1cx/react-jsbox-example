import React from 'react'
import ReactJSBox, { useMotion } from 'react-jsbox'
const { width, height } = $device.info.screen

export default function MotionExample() {
  const [state] = useMotion()

  return (
    <view frame={styles.container}>
      <text frame={styles.container} text={JSON.stringify(state, null, 2)} />
    </view>
  )
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(0, 64, width, 30)
}