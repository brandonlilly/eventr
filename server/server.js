import fs from 'fs'
import path from 'path'
import Express from 'express'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { renderFullPage } from './utils'
import routes from '../app/routes'
import Provider from '../app/components/Provider'
import busboy from 'connect-busboy'
import { StringDecoder } from 'string_decoder'
import morgan from 'morgan'

import data from './event'

const app = Express()
const port = 3000

let template = fs.readFileSync(path.resolve(__dirname, 'template/index.hbs'), "utf-8")
let styling =  fs.readFileSync(path.resolve(__dirname, 'template/index.css'), "utf-8")

const logger = morgan('tiny')
app.use(logger)
app.use('/', Express.static('dist'))
app.post('/upload', busboy(), handleUpload)
app.use('/', handleRender)

function renderApp(props, res) {
  const state = { template, data, styling }
  const markup = renderToString(
    <Provider store={state}>
      <RouterContext {...props}/>
    </Provider>
  )
  return renderFullPage(markup, state)
}

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(renderApp(renderProps, res))
    } else {
      res.status(404).send('Not found')
    }
  })
}

function handleUpload(req, res) {
  req.pipe(req.busboy)
  req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('file uploading...')

    if (mimetype === 'text/css') {
      let contents = ''
      let decoder = new StringDecoder('utf8')

      file.on('data', data => {
        contents += decoder.write(data)
      })

      file.on('end', () => {
        styling = contents
      })
    }

  })

  req.busboy.on('error', error => {
    console.error(error)
    res.send(500, 'Error', error)
  })

  req.busboy.on('finish', () => {
    console.log('done parsing')
    // res.writeHead(303, { Connection: 'close', Location: '/' })
    // res.end()
    res.status(200).send('success')
  })
}

app.listen(port, () => {
  console.log(`
  Server Started ${chalk.green('✓')}
  url: http://localhost:${port}
  `)
})
