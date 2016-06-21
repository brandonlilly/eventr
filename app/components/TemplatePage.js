import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'
import { getContents } from '../utils'

export default class TemplatePage extends Component {
  onDrop(files) {
    const { store, setStore } = this.context

    files.forEach(file => {
      getContents(file, contents => {
        const fd = new FormData()
        files.forEach(file => {
          fd.append(file.name, file)
        })

        fetch('/upload', { method: 'post', body: fd })
          .then(response => {
            setStore({ ...store, styling: content })
          })
          .catch(error => {
            console.log('catch', error)
          })
      })
    })
  }

  render() {
    const { template, styling } = this.context.store

    return (
      <div className="TemplatePage">
        <Banner>
          <Nav/>
        </Banner>
        <div className="content">
          <h1>Upload</h1>
          <Uploader onDrop={files => this.onDrop(files)}/>
          <div className="columns">
            <pre>
              {template}
            </pre>
            <pre>
              {styling}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

TemplatePage.contextTypes = {
  store: React.PropTypes.object,
  setStore: React.PropTypes.func,
}
