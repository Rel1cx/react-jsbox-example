import React from 'react'
import { render } from 'react-jsbox'
import CodeView from './components/CodeView'
import CustomProfiler from './components/CustomProfiler'
import ExampleComps from './examples'
import ExampleView from './components/ExampleView'
import { printRenderTimings } from './helper'

const { width } = $ui.vc.view.frame

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
            const Comp = components[name]
            render(
              <ExampleView
                frame={view.frame}
                demo={
                  <CustomProfiler id={name} onRender={printRenderTimings}>
                    <Comp frame={view.frame} />
                  </CustomProfiler>
                }
                code={
                  <CodeView
                    frame={view.frame}
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
    title: 'ReactJSBox Example'
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
