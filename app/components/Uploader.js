import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class Uploader extends Component {
  render() {
    return (
      <Dropzone
        {...this.props}
        className="Uploader"
        multiple={false}
        activeClassName="active">
        <svg className="icon-upload-1"><use xlinkHref="/images/icons.svg#icon-upload-1"></use></svg>
      </Dropzone>
    )
  }
}
