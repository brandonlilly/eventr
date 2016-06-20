import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/HomePage'
import TemplatePage from './components/TemplatePage'

export default
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="template" component={TemplatePage}/>
  </Route>
