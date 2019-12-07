import React from 'react'
const { width } = $device.info.screen
const palette = ['#3f51b5', '#4CAF50', '#FF9800']
export default function StackViewExample() {
    return (
        <stack
            frame={$rect(0, 0, width, width)}
            axis={$stackViewAxis.horizontal}
            distribution={$stackViewDistribution.fillEqually}
            alignment={$stackViewAlignment.fill}
            spacing={10}
            baselineRelative={true}
            layoutMarginsRelative={true}
        >
            {[...Array(3).keys()].map((i) => <label
                key={i}
                text={String(i + 1)}
                align={$align.center}
                textColor={$color('white')}
                bgcolor={$color(palette[i])}
            />)}
        </stack>
    )
}
