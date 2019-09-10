import React from 'react'
const { width } = $device.info.screen

export default function StackViewExample() {
    return (
        <stack
            frame={$rect(0, 0, width, width)}
            axis={$stackViewAxis.horizontal}
            distribution={$stackViewDistribution.fillEqually}
            alignment={$stackViewAlignment.fill}
            spacing={10}
            baselineRelative={false}
            layoutMarginsRelative={false}
        >
            {[1, 2, 3].map((item) => <label
                key={item}
                text={String(item)}
                align={$align.center}
                bgcolor={$rgba(0, 0, 0, 0.35)}
            />)}
        </stack>
    )
}