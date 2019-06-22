import React from 'react'
import ReactJSBox from 'react-jsbox'
import ExampleView from './Components/ExampleView'
import CodeView from './Components/CodeView'
import ClassExample from './Components/ClassExample'
import ReducerExample from './Components/ReducerExample'
import CacheExample from './Components/CacheExample'
import HttpExample from './Components/HttpExample'

const { width, height } = $device.info.screen

const Comps = {
  ClassExample,
  ReducerExample,
  CacheExample,
  HttpExample
}

const createContainer = ID_list =>
  ID_list.map(id => ({
    title: id,
    rows: [
      {
        type: 'view',
        props: {
          id
        },
        layout: $layout.fill
      }
    ]
  }))

// Create a root Container:
$ui.render({
  props: {
    title: '',
    debugging: true
  },
  views: [
    {
      type: 'list',
      props: {
        rowHeight: width,
        data: createContainer(Object.keys(Comps))
      },
      layout(make, view) {
        make.edges.equalTo(view.super.safeArea)
      }
    }
  ]
})

// Create React elements and render them:
for (const [CompName, Comp] of Object.entries(Comps)) {
  ReactJSBox.render(
    <ExampleView demo={<Comp />} code={<CodeView content={$file.read(`scripts/Components/${CompName}.js`).string} />} />,
    $(CompName)
  )
}
