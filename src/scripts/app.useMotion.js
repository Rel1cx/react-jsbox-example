import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './Containers/root'
const {width, height} = $device.info.screen

const App = () => {
  const [state] = ReactJSBox.useMotion()

  return (
    <view frame={styles.container}>
      <text frame={styles.container} text={JSON.stringify(state, null, 2)} />
    </view>
  )
}

let styles = {
  container: $rect(0, 0, width, height - 40),
  text: $rect(0, 64, width, 30)
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
