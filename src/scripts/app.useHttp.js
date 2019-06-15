import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './Containers/root'
import { apiKey } from './constants'
const { useState, useEffect } = React
const { width, height } = $device.info.screen

const useHttp = url => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    void async function() {
      try {
        setLoading(true)
        const { data } = await $http.get(url)
        setData(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }()
  }, [url])

  return [data, loading, error]
}

const App = () => {
  const [data, loading, error] = useHttp(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
  // Loading state
  if (loading) {
    return (
      <view frame={styles.container}>
        <label frame={styles.title} font={$font(48)} text={'APOD'} align={$align.center} />
        <spinner frame={styles.spinner} loading={loading} />
      </view>
    )
  }

  // Error state
  if (error) {
    return (
      <view style={styles.container}>
        <label style={styles.label} text={data.error.message} />
      </view>
    )
  }

  // Fetched content state
  return (
    <view frame={styles.container}>
      <image frame={styles.image} src={data.url} />
      <label frame={styles.label} font={$font('.SFUI-bold', 26)} text={data.title} />
      <text frame={styles.text} font={$font('.SFUI', 14)} text={data.explanation} selectable={false} />
    </view>
  )
}

const styles = {
  container: $rect(0, 10, width, height - 40),
  title: $rect(0, height * 0.25, width, 50),
  spinner: $rect(width * 0.5 - 10, height * 0.4, 20, 20),
  image: $rect(0, 0, width, 280),
  label: $rect(0, 290, width, 25),
  text: $rect(0, 320, width, height - 400)
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<App />, $('root'))
