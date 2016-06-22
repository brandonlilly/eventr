import fs from 'fs'
import path from 'path'
import configureStore from '../../app/store/configureStore'
import { setStyling, setTemplate, setCurrentEvent } from '../../app/store'


import data from '../event'

export default function createStore() {
  let template = fs.readFileSync(path.resolve(__dirname, '../template/index.hbs'), "utf-8")
  let styling =  fs.readFileSync(path.resolve(__dirname, '../template/index.css'), "utf-8")

  const store = configureStore()
  store.dispatch(setStyling(styling))
  store.dispatch(setTemplate(template))
  store.dispatch(setCurrentEvent(data))

  return store
}
