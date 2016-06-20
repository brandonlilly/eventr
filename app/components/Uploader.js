import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class Uploader extends Component {
  render() {
    return (
      <Dropzone
        {...this.props}
        className="Uploader"
        activeClassName="active"
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    )
  }
}
