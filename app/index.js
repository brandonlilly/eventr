import 'isomorphic-fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import routes from './routes'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

if (process.env.NODE_ENV !== 'production') {
  console.log('bundle loaded')
}

const history = browserHistory
const initialState = window.__STATE__
const store = configureStore(initialState)

match({ history, routes }, (error, redirectLocation, renderProps) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('root')
  )
})
