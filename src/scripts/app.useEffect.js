import React from 'react'
import ReactJSBox from '../../../react-jsbox-renderer/lib/react-jsbox'
import rootContainer from './Containers/root'
const {width, height} = $device.info.screen
const App = () => {
  ReactJSBox.useAuth(2, '验证已继续', success =>
    $ui.alert(success ? '验证成功' : '验证失败')
  )
  return (
    <view frame={styles.container}>
      <text
        frame={styles.container}
        font={$font('iosevka', 14)}
        text={'Touch ID demo'}
        autoFontSize={true}
      />
    </view>
  )
}

let styles = {
  container: $rect(0, 0, width, height - 40)
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
