import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'

export default class TemplatePage extends Component {
  onDrop(files) {
    console.log('files!', files)
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
          <pre>
            {template}
          </pre>
          <pre>
            {styling}
          </pre>
        </div>
      </div>
    )
  }
}

TemplatePage.contextTypes = {
  store: React.PropTypes.object
}
