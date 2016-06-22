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
import createStore from './utils/createStore'
import { setStyling, setTemplate } from '../app/store'
import Handlebars from 'handlebars'
import validateCss from 'css-validator'

const app = Express()
const port = 3000

const logger = morgan('tiny')
app.use(logger)
app.use(Express.static('dist'))
app.post('/styling', busboy(), handleStylingUpload)
app.post('/template', busboy(), handleTemplateUpload)
app.use('/', handleRender)

const store = createStore()
let cache = {}

store.subscribe(() => {
  cache = {}
})

function renderApp(props, req) {
  const url = req.url

  if (cache[url]) {
    console.log(`using cache for ${url}`)
    return cache[url]
  }

  const markup = renderToString(
    <Provider store={store}>
      <RouterContext {...props}/>
    </Provider>
  )
  const page = renderFullPage(markup, store.getState())
  cache[url] = page
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
