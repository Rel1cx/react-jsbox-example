import React from 'react'
import { codeIcon } from '../constants'
const { width, height } = $device.info.screen
export default class ExampleView extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCode: false
    }
  }
  render() {
    return (
      <>
        <view frame={$rect(0, 0, width, width)} hidden={!this.state.showCode}>
          {this.props.code}
        </view>
        <view frame={$rect(0, 0, width, width)} hidden={this.state.showCode}>
          {this.props.demo}
        </view>
        <button
          frame={$rect(width - 50, width - 40, 40, 35)}
          image={codeIcon}
          bgcolor={$color('clear')}
          events={{
            tapped: () => {
              this.setState({
                showCode: !this.state.showCode
              })
              $audio.play({
                id: 1104
              })
            }
          }}
        />
      </>
    )
  }
}
