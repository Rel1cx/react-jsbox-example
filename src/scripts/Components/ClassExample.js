import React from 'react'
import ReactJSBox from 'react-jsbox'
const { width, height } = $device.info.screen

// Create React Components:
export default class ClassExample extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this._listTemplate = {
      props: {
        bgcolor: $color('#fff')
      },
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
  }

  render() {
    return (
      <view frame={styles.container}>
        <label
          frame={styles.text}
          align={$align.center}
          font={$font('ArialRoundedMTBold', 26)}
          text={String(this.state.count)}
          autoFontSize={true}
        />
        <list
          frame={styles.list}
          scrollEnabled={false}
          radius={10}
          bgcolor={$color('#ededed')}
          data={['INCREASE', 'DECREASE', 'RESET']}
          template={this._listTemplate}
          events={{
            didSelect: (sender, { row }, data) =>
              this.setState({
                count: this.state.count + [1, -1, -this.state.count][row]
              })
          }}
        />
      </view>
    )
  }
}

const styles = {
  container: $rect(0, 0, width, width),
  text: $rect(0, 64, width, 30),
  list: $rect(0, width * 0.5, width, 132)
}
