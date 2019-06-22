import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './containers/root'
import ExampleView from './Components/ExampleView'
import CodeView from './Components/CodeView'
import ClassExample from './Components/ClassExample'
import ReducerExample from './Components/ReducerExample'
import CacheExample from './Components/CacheExample'
import HttpExample from './Components/HttpExample'

const Comps = {
  ClassExample,
  ReducerExample,
  CacheExample,
  HttpExample
}

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
for (let [CompName, Comp] of Object.entries(Comps)) {
  ReactJSBox.render(
    <ExampleView demo={<Comp />} code={<CodeView content={$file.read(`scripts/Components/${CompName}.js`).string} />} />,
    $(CompName)
  )
}
