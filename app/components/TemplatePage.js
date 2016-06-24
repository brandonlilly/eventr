import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'
import { getFileContents } from '../utils'
import { getStyling, getTemplate, saveStylingFile, saveTemplateFile } from '../store'


const UploadPane = ({ children, title, onDrop, ...props }) =>
  <Dropzone
    {...props}
    className="UploadPane"
    multiple={false}
    disableClick={true}
    activeClassName="active"
    onDrop={files => onDrop(files[0])}>
    <header>
      <Uploader onDrop={props.onDrop}/>
      <h1>{title}</h1>
    </header>
    <pre>
      {children}
    </pre>
  </Dropzone>


class TemplatePage extends Component {
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
            <UploadPane onDrop={saveTemplateFile} title="Template">
              {template}
            </UploadPane>
            <UploadPane onDrop={saveStylingFile} title="Style">
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
