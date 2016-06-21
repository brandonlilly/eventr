import React from 'react'
import ReactDOM from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import routes from './routes'
import Provider from './components/Provider'
import 'isomorphic-fetch'

if (process.env.NODE_ENV !== 'production') {
  console.log('bundle loaded')
}

const history = browserHistory
const state = window.__STATE__

match({ history, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Provider store={state}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('root')
  )
})
