import fs from 'fs'
import path from 'path'
import Express from 'express'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../app/components/App'

const app = Express()
const port = 3000

app.use('/generated', Express.static('dist/generated'))
app.use('/', handleRender)

function handleRender(req, res) {

  const html = renderToString(<App/>)
  res.send(renderFullPage(html, {}))
}

function renderFullPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>eventr</title>
        <link href="generated/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="generated/bundle.js"></script>
      </body>
    </html>
  `
}


app.listen(port)
