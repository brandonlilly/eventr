import React, { Component } from 'react'

export default class Frame extends Component {
  constructor(props) {
    super(props)
    this.receiveMessage = this.receiveMessage.bind(this)
    this.promptResize = this.promptResize.bind(this)
  }

  promptResize() {
    this.frame.contentWindow.postMessage("get_height", '*')
  }

  receiveMessage(event) {
    this.frame.height = ''
    this.frame.height = event.data + "px"
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.receiveMessage)
    window.removeEventListener("resize", this.promptResize)
  }

  render() {
    const { styling, html } = this.props

    var frameSrc = `data:text/html,
      <html>
        <head>
          <style>
            * { box-sizing: border-box; }
            html { font-size: 10px; }
            body {
              background: rgb(251, 251, 250);
              font-size: 2rem;
              line-height: 3.2rem;

              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              color: rgb(100, 114, 119);
              font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            ${styling}
          </style>
        </head>
        <body style="margin:0px;">
          <div id="wrap">
            ${html}
          </div>
          <script>
            function receiveMessage(event) {
              if (event.data === 'get_height') {
                var height = window.document.getElementById('wrap').scrollHeight;
                event.source.postMessage(height, event.origin);
              }
            }

            window.addEventListener("message", receiveMessage, false);
          </script>
        </body>
      </html>
    `

    return (
      <div className="Frame">
        <iframe
          src={frameSrc}
          frameBorder="0"
          scrolling="no"
          ref={node => {this.frame = node}}
          onLoad={() => {
            this.promptResize()
            window.addEventListener("message", this.receiveMessage, false)
            window.addEventListener("resize", this.promptResize, false)
          }}
          />
      </div>
    )
  }
}
