import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

if (process.env.NODE_ENV !== 'production') {
  console.log('bundle loaded')
}

const { template, data } = window.__STATE__

ReactDOM.render(
  <App template={template} data={data} />,
  document.getElementById('root')
)
