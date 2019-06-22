import React from 'react'
import { codeIcon } from '../constants'
const { width, height } = $device.info.screen
export default class ExampleView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCode: false
    }
  }
  render() {
    return (
      <>
        {this.state.showCode ? this.props.code : this.props.demo}
        <button
          frame={$rect(width - 50, width - 40, 40, 35)}
          image={$data({ url: codeIcon }).image}
          bgcolor={$color('clear')}
          events={{
            tapped: () =>
              this.setState({
                showCode: !this.state.showCode
              })
          }}
        />
      </>
    )
  }
}
