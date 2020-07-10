import React from 'react'
import { render } from 'react-jsbox'
import ExampleView from './components/ExampleView'
import CodeView from './components/CodeView'
import ExampleComps from './examples'

const { width } = $device.info.screen

function makeCellData(components) {
  return Object.keys(components).map(name => ({
    title: name,
    rows: [
      {
        type: 'view',
        props: {
          id: name
        },
        layout: $layout.fill,
        events: {
          layoutSubviews(view) {
            if (view._reactRootContainer) return
            const Comp = components[name]
            render(
              <ExampleView
                demo={<Comp />}
                code={
                  <CodeView
                    content={$file.read(`scripts/examples/${name}.js`).string}
                  />
                }
              />,
              view
            )
          }
        }
      }
    ]
  }))
}

$app.keyboardToolbarEnabled = true
$ui.render({
  props: {
    title: 'ReactJSBox Example',
    debugging: true
  },
  views: [
    {
      type: 'list',
      props: {
        rowHeight: width,
        data: makeCellData(ExampleComps)
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      }
    }
  ]
})
