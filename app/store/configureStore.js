import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../store'

let middleware = []

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger')
  const logger = createLogger({
    collapsed: () => true,
    predicate: () => true,
  })
  middleware.push(logger)
}

const finalCreateStore = applyMiddleware(...middleware)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
