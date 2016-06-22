import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Banner from './Banner'
import Nav from './Nav'
import Uploader from './Uploader'
import { getFileContents } from '../utils'
import { getStyling, getTemplate, setStyling, setTemplate } from '../store'


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

      fetch(url, { method: 'post', body: fd })
        .then(response => {
          if (response.ok) {
            action(contents)
          }
        })
        .catch(error => {
          console.log(error)
        })
    })
  }

  render() {
    const { template, styling, setTemplate, setStyling } = this.props

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
            <UploadPane onDrop={files => this.upload(files[0], '/template', setTemplate)} title="Template">
              {template}
            </UploadPane>
            <UploadPane onDrop={files => this.upload(files[0], '/styling', setStyling)} title="Style">
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

export default connect(mapStateToProps, { setStyling, setTemplate })(TemplatePage)
