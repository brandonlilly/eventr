import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'
import { getFileContents } from '../utils'
import { getStyling, getTemplate, setStyling } from '../redux'

class TemplatePage extends Component {
  onDrop(files) {
    const { setStyling } = this.props

    files.forEach(file => {
      getFileContents(file, contents => {
        const fd = new FormData()
        files.forEach(file => {
          fd.append(file.name, file)
        })

        fetch('/upload', { method: 'post', body: fd })
          .then(response => {
            setStyling(contents)
          })
          .catch(error => {
            console.log('catch', error)
          })
      })
    })
  }

  render() {
    const { template, styling } = this.props

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

const mapStateToProps = (state, props) => ({
  template: getTemplate(state),
  styling: getStyling(state),
})

export default connect(mapStateToProps, { setStyling })(TemplatePage)
