import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './containers/root'
import ExampleView from './Components/ExampleView'
import CodeView from './Components/CodeView'
import ClassExample from './Components/ClassExample'
import ReducerExample from './Components/ReducerExample'
import CacheExample from './Components/CacheExample'
import HttpExample from './Components/HttpExample'

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(
  <ExampleView
    demo={<ClassExample />}
    code={<CodeView content={$file.read('scripts/Components/ClassExample.js').string} />}
  />,
  $('ClassExample')
)

ReactJSBox.render(
  <ExampleView
    demo={<ReducerExample />}
    code={<CodeView content={$file.read('scripts/Components/ReducerExample.js').string} />}
  />,
  $('ReducerExample')
)

ReactJSBox.render(
  <ExampleView
    demo={<CacheExample />}
    code={<CodeView content={$file.read('scripts/Components/CacheExample.js').string} />}
  />,
  $('CacheExample')
)

ReactJSBox.render(
  <ExampleView
    demo={<HttpExample />}
    code={<CodeView content={$file.read('scripts/Components/HttpExample.js').string} />}
  />,
  $('HttpExample')
)
