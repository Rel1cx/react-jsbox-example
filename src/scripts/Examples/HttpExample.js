import React from 'react'
import { apiKey } from '../constants'
import { articleToMarkdown } from '../helper'
const { useState, useEffect } = React
const { width, height } = $device.info.screen

const useHttp = url => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // prettier-ignore
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
  const [data, loading, error] = useHttp(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)

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
  if (error || data.error) {
    return <label frame={styles.message} lines={5} font={$font(16)} text={(error || data.error).message} />
  }

  // Fetched content state
  return <markdown frame={$('HttpExample').frame} content={articleToMarkdown(data.url, data.title, data.explanation)} />
}

const styles = {
  message: $rect(0, width * 0.25, width, 200),
  loading: $rect(0, width * 0.3, width, 50),
  spinner: $rect(width * 0.5 - 10, width * 0.5, 20, 20)
}
