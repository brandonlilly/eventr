import fs from 'fs'
import path from 'path'
import Express from 'express'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from '../app/components/App'

import data from './event'

const app = Express()
const port = 3000

app.use('/generated', Express.static('dist/generated'))
app.use('/', handleRender)

let template = fs.readFileSync(path.resolve(__dirname, 'template/index.hbs'), "utf-8")
let styling =  fs.readFileSync(path.resolve(__dirname, 'template/index.css'), "utf-8")

function handleRender(req, res) {
  const state = { template, data, styling }

  const html = renderToString(<App  {...state} />)
  res.send(renderFullPage(html, state))
}

function renderFullPage(html, state) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>eventr</title>
        <link href="generated/styles.css" rel="stylesheet" type="text/css" />
        <style>${styling}</style>
      </head>
      <body>
        <div id="root">${html}</div>
          <script>
            window.__STATE__ = ${JSON.stringify(state)}
          </script>
        <script src="generated/bundle.js"></script>
      </body>
    </html>
  `
}


app.listen(port, () => {
  console.log(`
  Server Started ${chalk.green('✓')}
  url: http://localhost:${port}
  `)
})
