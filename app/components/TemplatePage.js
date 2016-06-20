import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Uploader from './Uploader'

export default class TemplatePage extends Component {
  onDrop(files) {
    console.log('files!', files)
  }

  render() {
    return (
      <div>
        <h1>Upload</h1>
        <Uploader onDrop={files => this.onDrop(files)}/>
      </div>
    )
  }
}
