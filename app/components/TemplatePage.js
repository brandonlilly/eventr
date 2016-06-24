import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'
import { getFileContents } from '../utils'
import { getStyling, getTemplate, saveStylingFile, saveTemplateFile } from '../store'


const UploadPane = ({ children, title, ...props }) =>
  <Dropzone
    {...props}
    className="UploadPane"
    multiple={false}
    disableClick={true}
    activeClassName="active">
    <header>
      <Uploader onDrop={props.onDrop}/>
      <h1>{title}</h1>
    </header>
    <pre>
      {children}
    </pre>
  </Dropzone>


class TemplatePage extends Component {
  upload(file, url, action) {
    const { setStyling } = this.props

    getFileContents(file, contents => {
      const fd = new FormData()
      fd.append(file.name, file)

      action(contents)
    })
  }

  render() {
    const { template, styling, saveTemplateFile, saveStylingFile } = this.props

    return (
      <div className="TemplatePage">
        <Banner>
          <Nav/>
        </Banner>
        <div className="content">
          <span className="info">
            <h1>Template</h1>
            <p>Customize how your events are displayed.</p>
            <p>Upload a handlebar template (.hbs) or stylesheet file (.css)</p>
          </span>
          <div className="columns">
            <UploadPane onDrop={files => saveTemplateFile(files[0])} title="Template">
              {template}
            </UploadPane>
            <UploadPane onDrop={files => saveStylingFile(files[0])} title="Style">
              {styling}
            </UploadPane>
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

export default connect(mapStateToProps, { saveStylingFile, saveTemplateFile })(TemplatePage)
