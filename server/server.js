import fs from 'fs'
import path from 'path'
import Express from 'express'
import chalk from 'chalk'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'
import { renderFullPage } from './utils'
import { extractFile } from './utils/file'
import { Provider } from 'react-redux'
import routes from '../app/routes'
import busboy from 'connect-busboy'
import morgan from 'morgan'
import configureStore from '../app/store/configureStore'
import { setStyling, setTemplate, setCurrentEvent, getCurrentEvent } from '../app/store'
import Handlebars from 'handlebars'

import validateCss from 'css-validator'

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
app.use(Express.static('dist'))
app.post('/styling', busboy(), handleStylingUpload)
app.post('/template', busboy(), handleTemplateUpload)
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

function handleStylingUpload(req, res) {
  extractFile(req)
    .then(({ contents, extension }) => {
      validateCss({ text: contents }, (error, data) => {
        if (error) return res.status(500).send(error)
        if (data.validity !== true) return res.status(500).send("Invalid css")

        store.dispatch(setStyling(contents))
        res.status(200).send("success")
      })
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

function handleTemplateUpload(req, res) {
  extractFile(req)
    .then(({ contents, extension }) => {
      try {
        Handlebars.compile(contents)({})
        store.dispatch(setTemplate(contents))
        res.status(200).send("success")
      } catch (e) {
        res.status(500).send(e)
        console.log('cat', e)
      }
    })
    .catch(error => {
      res.status(500).send(error)
    })
}

app.listen(port, () => {
  console.log(`
  Server Started ${chalk.green('✓')}
  url: http://localhost:${port}
  `)
})
