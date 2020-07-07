import React from 'react'
import useSWR from 'swr'
import { apiKey } from '../constants'
import { articleToMarkdown } from '../helper'

const { width } = $device.info.screen

async function fetcher(url) {
    const { data, error } = await $http.get(url)
    if (error) {
        throw new Error(error.localizedDescription)
    }
    return data
}

export default function HttpExample() {
    const { data, error } = useSWR(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
        fetcher
    )

    // Error state
    if (error) {
        return (
            <label
                frame={styles.loading}
                align={$align.center}
                lines={5}
                font={$font(16)}
                text={error.message}
            />
        )
    }

    // Loading state
    if (!data) {
        return (
            <>
                <label
                    frame={styles.loading}
                    font={$font(48)}
                    text="APOD"
                    align={$align.center}
                />
                <spinner frame={styles.spinner} loading={true} />
            </>
        )
    }

    // Fetched content state
    return (
        <markdown
            frame={styles.content}
            content={articleToMarkdown(data.url, data.title, data.explanation)}
        />
    )
}

const styles = {
    content: $rect(0, 0, width, width),
    loading: $rect(0, width * 0.3, width, 50),
    spinner: $rect(width * 0.5 - 10, width * 0.5, 20, 20)
}
