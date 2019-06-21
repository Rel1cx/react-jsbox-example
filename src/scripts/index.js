import React from 'react'
import ReactJSBox from 'react-jsbox'
import rootContainer from './containers/root'
import ClassExample from './app'
import ReducerExample from './app.useReducer'
import CacheExample from './app.useCache'
import HttpExample from './app.useHttp'

// Create a root Container:
$ui.render(rootContainer)

// Create React elements and render them:
ReactJSBox.render(<ClassExample />, $('ClassExample'))

ReactJSBox.render(<ReducerExample />, $('ReducerExample'))

ReactJSBox.render(<CacheExample />, $('CacheExample'))

ReactJSBox.render(<HttpExample />, $('HttpExample'))
