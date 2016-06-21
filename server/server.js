import fs from 'fs'
import path from 'path'
import Express from 'express'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { renderFullPage } from './utils'
import { Provider } from 'react-redux'
import routes from '../app/routes'
import busboy from 'connect-busboy'
import { StringDecoder } from 'string_decoder'
import morgan from 'morgan'
import configureStore from '../app/store/configureStore'
import { setStyling, setTemplate, setCurrentEvent } from '../app/store'

const app = Express()
const port = 3000

import data from './event'
let template = fs.readFileSync(path.resolve(__dirname, 'template/index.hbs'), "utf-8")
let styling =  fs.readFileSync(path.resolve(__dirname, 'template/index.css'), "utf-8")

const store = configureStore()
store.dispatch(setStyling(styling))
store.dispatch(setTemplate(template))
store.dispatch(setCurrentEvent(data))

const logger = morgan('tiny')
app.use(logger)
app.use('/', Express.static('dist'))
app.post('/upload', busboy(), handleUpload)
app.use('/', handleRender)

let cache = {
  stale: true,
  url: null,
  page: null,
}

store.subscribe(() => {
  cache.stale = true
})

function renderApp(props, req) {
  if (req.url !== cache.url) {
    cache.stale = true
  }

  if (!cache.stale) {
    console.log('using cache')
    return cache.page
  }

  const markup = renderToString(
    <Provider store={store}>
      <RouterContext {...props}/>
    </Provider>
  )

  const page = renderFullPage(markup, store.getState())
  
  cache.page = page
  cache.url = req.url
  cache.stale = false

  return page
}

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(renderApp(renderProps, req))
    } else {
      res.status(404).send('Not found')
    }
  })
}

function handleUpload(req, res) {
  req.pipe(req.busboy)
  req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype === 'text/css') {
      let contents = ''
      let decoder = new StringDecoder('utf8')

      file.on('data', data => {
        contents += decoder.write(data)
      })

      file.on('end', () => {
        store.dispatch(setStyling(contents))
      })
    }
  })

  req.busboy.on('error', error => {
    console.error(error)
    res.send(500, 'Error', error)
  })

  req.busboy.on('finish', () => {
    res.status(200).send('success')
  })
}

app.listen(port, () => {
  console.log(`
  Server Started ${chalk.green('✓')}
  url: http://localhost:${port}
  `)
})
