import React from 'react'
import { apiKey } from './constants'
const { useState, useEffect } = React
const { width, height } = $device.info.screen

const useHttp = url => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

export default function HttpExample() {
  // const { width, height } = context
  const [data, loading, error] = useHttp(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)

  const content = `
  ![](${data.url})
  ### ${data.title}
  ${data.explanation}
  `

  // Loading state
  if (loading) {
    return (
      <>
        <label frame={styles.loading} font={$font(48)} text={'APOD'} align={$align.center} />
        <spinner frame={styles.spinner} loading={loading} />
      </>
    )
  }

  // Error state
  if (error) {
    return <label style={styles.label} text={data.error.message} />
  }

  // Fetched content state
  return <markdown frame={$('HttpExample').frame} content={content} />
}

const styles = {
  loading: $rect(0, height * 0.25, width, 50),
  spinner: $rect(width * 0.5 - 10, height * 0.4, 20, 20)
}
